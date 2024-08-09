import { useEffect, useRef, useState } from 'react'
import StarRating from './StarRating'
import { Loader } from './Loader'

const KEY = '2e839089'

export const MovieDetails = ({
  selectedID,
  onCloseMovie,
  onAddWatched,
  watched,
}) => {
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userRating, setUserRating] = useState(0)

  const countRef = useRef(0) // (1) we can compare with the "count" variable
  let count = 0 // *** this won't work because it will reset every render

  // (2) because we can't mutate the ref during the render phase, we need to use useEffect
  useEffect(() => {
    if (userRating) countRef.current += 1
    if (userRating) count += 1
  }, [userRating])

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedID)
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedID
  )?.userRating

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    imdbID,
  } = movie

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID,
      title,
      year,
      poster,
      imdbRating,
      runtime: Number(runtime.split(' ')[0]),
      userRating,
      countRatingDecisions: countRef.current, // (3)
      count,
    }
    onAddWatched(newWatchedMovie)
    onCloseMovie()
  }

  useEffect(() => {
    function closeMovieDetails(e) {
      if (e.code === 'Escape') {
        onCloseMovie()
        console.log('CLOSING')
      }
    }

    document.addEventListener('keydown', closeMovieDetails)

    return function () {
      document.removeEventListener('keydown', closeMovieDetails)
    }
  }, [onCloseMovie])

  useEffect(() => {
    if (!title) return
    document.title = `Movie - ${title}`

    return function () {
      document.title = 'usePopcorn'
      console.log(`Clean up effect for movie ${title}`)
    }
  }, [title])

  useEffect(() => {
    const getMovieDetails = async (id) => {
      setIsLoading(true)
      const URL = `http://www.omdbapi.com/?i=${id}&apikey=${KEY}`

      try {
        const res = await fetch(URL)

        if (!res.ok) throw new Error('Something went wrong.')

        const data = await res.json()

        if (data.Response === 'False')
          throw new Error('Movie details not found.')

        setMovie(data)
      } catch (error) {
        console.log(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    getMovieDetails(selectedID)
  }, [selectedID])

  return (
    <div className='details'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className='btn-back' onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className='details-overview'>
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb Rating
              </p>
            </div>
          </header>

          <section>
            <div className='rating'>
              {!isWatched ? (
                <>
                  <StarRating
                    size={24}
                    maxRating={10}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className='btn-add' onClick={handleAdd}>
                      + Add to List
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie with <span>{watchedUserRating} ⭐</span>
                </p>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>
              <strong>Starring:</strong> {actors}
            </p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  )
}
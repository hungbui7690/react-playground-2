/*
  One More Effect Listening to a Keypress  
  - we want user can press Esc key to close the MovieDetails
    > addEventListener

    (1) App

  *** after the component is closed, we press Esc key, and it still runs 
      > everytime the component is mount, a new event listener is added to this component 
        + we can test by click on a movie, then press esc > then press another movie, then press esc... > we will see the console.log() appear multiple times
      > need clean up fn

*/

import { Fragment, useEffect, useState } from 'react'
import { Navbar, NumResults, Search } from './components/Navbar'
import { MoviesList } from './components/MovieList'
import { MovieDetails } from './components/MovieDetails'
import WatchedSummary from './components/WatchedSummary'
import { WatchedList } from './components/WatchedList'
import { Loader } from './components/Loader'

const KEY = '2e839089'

export default function App() {
  const [movies, setMovies] = useState([])
  const [watched, setWatched] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState('')
  const [query, setQuery] = useState('hero')
  const [selectedID, setSelectedID] = useState()

  function handleSelectMovie(id) {
    setSelectedID(id === selectedID ? null : id)
  }

  function handleCloseMovie() {
    setSelectedID(null)
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie])
  }

  function handleDeleteWatched(id) {
    console.log(id)
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id))
  }

  // (1) we move this the the MovieDetails component
  // useEffect(() => {
  //   document.addEventListener('keydown', function (e) {
  //     if (e.code === 'Escape') {
  //       handleCloseMovie()
  //       console.log('CLOSING')
  //     }
  //   })
  // }, [])

  useEffect(
    function () {
      const controller = new AbortController()

      async function fetchMovies() {
        try {
          setIsError('')
          setIsLoading(true)

          const URL = `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`

          const res = await fetch(URL, { signal: controller.signal })

          if (!res.ok) throw new Error('Something went wrong.')

          const data = await res.json()

          if (data.Response === 'False' || !data.Search)
            throw new Error('Movies not found.')

          setIsError('')
          setMovies(data?.Search)
        } catch (err) {
          if (err.name !== 'AbortError') {
            setIsError(err.message)
          }
        } finally {
          setIsLoading(false)
        }
      }

      if (!query.length) {
        setMovies([])
        setIsError('')
        return
      }

      fetchMovies()

      return function () {
        controller.abort()
      }
    },
    [query]
  )

  return (
    <Fragment>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !isError && (
            <MoviesList movies={movies} onSelectedMovie={handleSelectMovie} />
          )}
          {isError && <ErrorMessage message={isError} />}
        </Box>

        <Box>
          {selectedID ? (
            <MovieDetails
              selectedID={selectedID}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <Fragment>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </Fragment>
          )}
        </Box>
      </Main>
    </Fragment>
  )
}

function Main({ children }) {
  return <main className='main'>{children}</main>
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className='box'>
      <button className='btn-toggle' onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? '–' : '+'}
      </button>

      {isOpen && children}
    </div>
  )
}

function ErrorMessage({ message }) {
  return (
    <p className='error'>
      <span>⛔</span> {message}
    </p>
  )
}

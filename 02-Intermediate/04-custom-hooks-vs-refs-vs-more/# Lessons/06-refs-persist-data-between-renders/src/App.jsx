/*
  Refs to Persist Data Between Renders
  - gives us the variable that is persisted across renders without triggering a re-render
  - for example: in this case, we want to know how many times the user click on the rating (stars)
    > it means that how long does it take a user to decide to rate a movie

    (1) MovieDetails

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
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState('')
  const [query, setQuery] = useState('')
  const [selectedID, setSelectedID] = useState()
  const [watched, setWatched] = useState(function () {
    return JSON.parse(localStorage.getItem('watched'))
  })

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

  useEffect(
    function () {
      localStorage.setItem('watched', JSON.stringify(watched))
    },
    [watched]
  )

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

      handleCloseMovie()
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

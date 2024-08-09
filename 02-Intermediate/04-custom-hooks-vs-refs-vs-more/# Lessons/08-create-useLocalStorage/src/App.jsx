/*
  Creating useLocalStorageState
    (1) create useLocalStorageState

*/

import { Fragment, useState } from 'react'
import { Navbar, NumResults, Search } from './components/Navbar'
import { MoviesList } from './components/MovieList'
import { MovieDetails } from './components/MovieDetails'
import WatchedSummary from './components/WatchedSummary'
import { WatchedList } from './components/WatchedList'
import { Loader } from './components/Loader'
import { useMovie } from './useMovie'
import { useLocalStorageState } from './useLocalStorageState'

export default function App() {
  const [query, setQuery] = useState('')
  const [selectedID, setSelectedID] = useState()
  const { movies, isLoading, isError } = useMovie(query)
  const [watched, setWatched] = useLocalStorageState([], 'watched') // (3)

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

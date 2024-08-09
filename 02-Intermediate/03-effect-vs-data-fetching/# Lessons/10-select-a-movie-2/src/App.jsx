/*
  Selecting a Movie

*/

import { Fragment, useEffect, useState } from 'react'

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0)

const KEY = '2e839089'

export default function App() {
  const [movies, setMovies] = useState([])
  const [watched, setWatched] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState('')
  const [query, setQuery] = useState('hero')

  const [selectedID, setSelectedID] = useState()

  function handleSelectMovie(id) {
    setSelectedID(id === selectedID ? null : id) // (4)
  }

  // (1)
  function handleCloseMovie() {
    setSelectedID(null)
  }

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsError('')
          setIsLoading(true)

          const URL = `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`

          const res = await fetch(URL)

          if (!res.ok) throw new Error('Something went wrong.')

          const data = await res.json()
          console.log(data)

          if (data.Response === 'False' || !data.Search)
            throw new Error('Movies not found.')

          setMovies(data?.Search)
        } catch (err) {
          setIsError(err.message)
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
              onCloseMovie={handleCloseMovie} // (2)
            />
          ) : (
            <Fragment>
              <WatchedSummary watched={watched} />
              <WatchedList watched={watched} />
            </Fragment>
          )}
        </Box>
      </Main>
    </Fragment>
  )
}

function Loader() {
  return <p className='loader'>Loading...</p>
}

function ErrorMessage({ message }) {
  return (
    <p className='error'>
      <span>⛔</span> {message}
    </p>
  )
}

function Navbar({ children }) {
  return (
    <nav className='nav-bar'>
      <Logo />
      {children}
    </nav>
  )
}

function Logo() {
  return (
    <div className='logo'>
      <span role='img'>🍿</span>
      <h1>usePopcorn</h1>
    </div>
  )
}

function Search({ query, setQuery }) {
  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}

function NumResults({ movies }) {
  return (
    <p className='num-results'>
      Found <strong>{movies.length}</strong> results
    </p>
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

function MoviesList({ movies, onSelectedMovie }) {
  return (
    <ul className='list'>
      {movies?.map((movie) => (
        <Movie
          key={movie.imdbID}
          movie={movie}
          onSelectedMovie={onSelectedMovie}
        />
      ))}
    </ul>
  )
}

function Movie({ movie, onSelectedMovie }) {
  return (
    <li key={movie.imdbID} onClick={() => onSelectedMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  )
}

// (3)
const MovieDetails = ({ selectedID, onCloseMovie }) => {
  return (
    <div className='details'>
      {/* back button */}
      <button className='btn-back' onClick={onCloseMovie}>
        &larr;
      </button>
    </div>
  )
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating))
  const avgUserRating = average(watched.map((movie) => movie.userRating))
  const avgRuntime = average(watched.map((movie) => movie.runtime))

  return (
    <div className='summary'>
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  )
}

const WatchedList = ({ watched }) => {
  return (
    <ul className='list'>
      {watched.map((movie) => (
        <WatchedMovies key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  )
}

function WatchedMovies({ movie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  )
}

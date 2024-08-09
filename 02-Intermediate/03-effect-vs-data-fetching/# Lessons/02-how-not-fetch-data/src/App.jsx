/*
  Section Overview

  The Component Lifecycle

  How NOT to Fetch Data in React
  - pic
  - https://www.omdbapi.com/
    > API Key tab 
    > Free > enter email 
      + use https://temp-mail.org/

  *** if we go to network tab > we will see that the left bot corner that the requests to server increase rapidly
      > because the setMovies() triggers re-render again and again > create infinite loop 

  *** but we still need to setMovies() > that's when useEffect comes in to play

*/

import { Fragment, useState } from 'react'
import { tempMovieData, tempWatchedData } from './data'

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0)

const KEY = '2e839089' // (1) http://www.omdbapi.com/apikey.aspx

export default function App() {
  const [movies, setMovies] = useState([]) // (3)
  const [watched, setWatched] = useState([])

  // (2)
  fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=interstellar`)
    .then((res) => res.json())
    .then((data) => console.log(data.Search))

  // (4) another way to trigger inf loop
  // setWatched([])

  return (
    <Fragment>
      <Navbar>
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          <MoviesList movies={movies} />
        </Box>

        <Box>
          <WatchedSummary watched={watched} />
          <WatchedList watched={watched} />
        </Box>
      </Main>
    </Fragment>
  )
}

function Navbar({ children }) {
  return (
    <nav className='nav-bar'>
      <Logo />
      <Search />
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

function Search() {
  const [query, setQuery] = useState('')

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

function MoviesList({ movies }) {
  return (
    <ul className='list'>
      {movies?.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
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

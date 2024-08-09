/*
  Component Categories

  # Component Composition

///////////////////////////////

  Fixing Prop Drilling With Composition And Building a Layout
    (1) Navbar

      ~~ Method 1:
          <Navbar>
            <Logo />
            <Search />
            <NumResults movies={movies} />
          </Navbar>

          <nav className='nav-bar'>{children}</nav>

      ~~ Method 2: because we don't need "movies" for Logo & Search, we can put it back in Navbar component
          <Navbar>
            <NumResults movies={movies} />
          </Navbar>

          <nav className='nav-bar'>
            <Logo />
            <Search />
            {children}
          </nav>
*/

import { Fragment, useState } from 'react'
import { tempMovieData, tempWatchedData } from './data'

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0)

export default function App() {
  const [movies, setMovies] = useState(tempMovieData)
  const [watched, setWatched] = useState(tempWatchedData)

  return (
    <Fragment>
      {/* (2) now, we pass the children for Navbar here > with this setup, we don't need to pass "movies to Navbar" anymore */}
      <Navbar>
        <NumResults movies={movies} />
      </Navbar>

      <Main movies={movies} watched={watched} />
    </Fragment>
  )
}

// (1) add "children"
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

function Main({ movies, watched }) {
  const [isOpen1, setIsOpen1] = useState(true)
  const [isOpen2, setIsOpen2] = useState(true)

  return (
    <main className='main'>
      <ListBox movies={movies} isOpen1 setIsOpen1 />
      <WatchedBox watched={watched} isOpen2 setIsOpen2 />
    </main>
  )
}

function ListBox({ isOpen1, setIsOpen1, movies }) {
  return (
    <div className='box'>
      <button
        className='btn-toggle'
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? '–' : '+'}
      </button>
      {isOpen1 && (
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
      )}
    </div>
  )
}

function WatchedBox({ setIsOpen2, isOpen2, watched }) {
  return (
    <div className='box'>
      <button
        className='btn-toggle'
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? '–' : '+'}
      </button>
      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedList watched={watched} />
        </>
      )}
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

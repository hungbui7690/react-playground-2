// (3)
export const WatchedList = ({ watched, onDeleteWatched }) => {
  return (
    <ul className='list'>
      {watched.map((movie) => (
        <WatchedMovies
          key={movie.imdbID}
          movie={movie}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  )
}

// (4)
function WatchedMovies({ movie, onDeleteWatched }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
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

        {/* (5) */}
        <p style={{ cursor: 'pointer' }}>
          <span onClick={() => onDeleteWatched(movie.imdbID)}>❌ </span>
        </p>
      </div>
    </li>
  )
}

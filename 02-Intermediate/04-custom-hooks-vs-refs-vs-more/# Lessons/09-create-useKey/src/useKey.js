import { useEffect } from 'react'

// (1) MovieDetails
export function useKey(key, callback) {
  useEffect(() => {
    function closeMovieDetails(e) {
      // *** need to convert to lower case
      if (e.code.toLowerCase() === key.toLowerCase()) {
        callback()
      }
    }

    document.addEventListener('keydown', closeMovieDetails)

    return function () {
      document.removeEventListener('keydown', closeMovieDetails)
    }
  }, [callback, key])
}

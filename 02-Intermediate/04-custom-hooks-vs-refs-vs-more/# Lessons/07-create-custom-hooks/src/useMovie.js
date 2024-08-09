import { useEffect, useState } from 'react'

const KEY = '2e839089'

// (1) "query" as param
//     "callback" is the handleCloseMovie
export function useMovie(query) {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState('')
  const [movies, setMovies] = useState([])

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

      // callback?.() // (2) must have optional chaining if use
      fetchMovies()

      return function () {
        controller.abort()
      }
    },
    [query]
    // [query, callback] // *** if we put "callback" here > it will create inf loop
  )

  // (3) go to App.jsx
  return { movies, isLoading, isError }
}

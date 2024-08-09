import { useEffect, useState } from 'react'

const KEY = '2e839089'

export function useMovie(query, callback) {
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

      fetchMovies()

      return function () {
        controller.abort()
      }
    },
    [query]
  )

  return { movies, isLoading, isError }
}

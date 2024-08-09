import { useEffect, useState } from 'react'

export function useLocalStorageState(initialState, key) {
  // (1) create this instead of "watched"
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : initialState
  })

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value)) // *** key
    },
    [value, key]
  )

  // (2)
  return [value, setValue]
}

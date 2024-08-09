import { useRef } from 'react'
import { useKey } from '../useKey'

export function Navbar({ children }) {
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

export function Search({ query, setQuery }) {
  const inputEl = useRef(null)

  // (3) NEW VERSION
  useKey('Enter', function () {
    if (document.activeElement === inputEl.current) return
    inputEl.current.focus()
    setQuery('')
  })

  // *** PREVIOUS VERSION
  /*
  useEffect(() => {
    function callback(e) {
      if (e.code === 'Enter') {
        console.log(inputEl.current)
        inputEl.current.focus()
        setQuery('')
      }
    }
    document.addEventListener('keydown', callback)
    return () => document.removeEventListener('keydown', callback)
  }, [])
*/

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  )
}

export function NumResults({ movies }) {
  return (
    <p className='num-results'>
      Found <strong>{movies.length}</strong> results
    </p>
  )
}

/*
  CHALLENGE 1 useGeolocate
  - after get the position, we can click on the link to show the map

*/

import { useState } from 'react'

function useGeolocation() {
  const [isLoading, setIsLoading] = useState(false)
  const [position, setPosition] = useState({})
  const [error, setError] = useState(null)

  const { lat, lng } = position

  function getPosition() {
    if (!navigator.geolocation)
      return setError('Your browser does not support geolocation')

    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        })
        setIsLoading(false)
      },
      (error) => {
        setError(error.message)
        setIsLoading(false)
      }
    )
  }

  return { getPosition, isLoading, error, lat, lng }
}

export default function App() {
  const { getPosition, isLoading, error, lat, lng } = useGeolocation()

  const [countClicks, setCountClicks] = useState(0) // ***

  // ***
  function handleClick() {
    getPosition()
    setCountClicks((count) => count + 1)
  }

  return (
    <div>
      <button onClick={handleClick} disabled={isLoading}>
        Get my position
      </button>

      {isLoading && <p>Loading position...</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && lat && lng && (
        <p>
          Your GPS position:{' '}
          <a
            target='_blank'
            rel='noreferrer'
            href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
          >
            {lat}, {lng}
          </a>
        </p>
      )}

      <p>You requested position {countClicks} times</p>
    </div>
  )
}

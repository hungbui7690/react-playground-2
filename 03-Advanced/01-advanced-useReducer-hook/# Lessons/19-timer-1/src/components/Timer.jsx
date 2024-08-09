import { useEffect } from 'react'

const Timer = ({ dispatch, secondRemaining }) => {
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' })
    }, 1000)

    return () => clearInterval(id) // *** must have this
  }, [dispatch])

  return <div className='timer'>{secondRemaining}</div>
}

export default Timer

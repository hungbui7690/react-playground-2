/*
  Managing Related Pieces of State  

*/

import { useReducer } from 'react'

function reducer(state, action) {
  // (4)
  switch (action.type) {
    case 'dec':
      return { ...state, count: state.count - 1 }
    case 'inc':
      return { ...state, count: state.count + 1 }
    case 'setCount':
      return { ...state, count: action.payload }
    case 'reset':
      return { ...state, count: 0, step: 1 }
    default:
      throw new Error('Unknown action !!') // *** MUST HAVE DEFAULT CASE
  }
}

function DateCounter() {
  const initialState = { count: 0, step: 1 } // (1)

  const [state, dispatch] = useReducer(reducer, initialState) // (2)

  const date = new Date('june 21 2027')
  date.setDate(date.getDate() + state.count) // (3)

  const dec = () => {
    dispatch({ type: 'dec', payload: -1 })
  }
  const inc = () => {
    dispatch({ type: 'inc', payload: 1 })
  }

  const defineCount = function (e) {
    dispatch({ type: 'setCount', payload: Number(e.target.value) })
  }

  const reset = () => {
    dispatch({ type: 'reset' })
  }

  return (
    <div className='counter'>
      <div>
        <input type='range' min='0' max='10' />
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  )
}

export default DateCounter

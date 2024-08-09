/*
  Managing Related Pieces of State  

*/

import { useReducer } from 'react'

function reducer(state, action) {
  switch (action.type) {
    case 'dec':
      return { ...state, count: state.count - state.step } // (3a)
    case 'inc':
      return { ...state, count: state.count + state.step } // (3b)
    case 'setCount':
      return { ...state, count: action.payload }
    case 'setStep':
      return { ...state, step: action.payload }
    case 'reset':
      return { ...state, count: 0, step: 1 }
    default:
      throw new Error('Unknown action !!')
  }
}

function DateCounter() {
  const initialState = { count: 0, step: 1 }

  const [state, dispatch] = useReducer(reducer, initialState)

  const date = new Date('june 21 2027')
  date.setDate(date.getDate() + state.count)
  const dec = () => {
    dispatch({ type: 'dec', payload: -1 })
  }
  const inc = () => {
    dispatch({ type: 'inc', payload: 1 })
  }

  const defineCount = function (e) {
    dispatch({ type: 'setCount', payload: Number(e.target.value) })
  }

  const defineStep = function (e) {
    dispatch({ type: 'setStep', payload: Number(e.target.value) }) // (1)
  }

  const reset = () => {
    dispatch({ type: 'reset' })
  }

  return (
    <div className='counter'>
      <div>
        <input
          type='range'
          min='0'
          max='10'
          value={state.step} // (2a)
          onChange={defineStep}
        />
        {/* (2b) */}
        {state.step}
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

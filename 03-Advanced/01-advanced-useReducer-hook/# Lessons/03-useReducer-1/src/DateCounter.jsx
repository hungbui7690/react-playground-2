/*
  useReducer
  - this is from previous challenge
  - useReducer hook:
    + work with reducer fn
    + take action as param 

  *** useReducer(reducer fn, initialState)

*/

import { useReducer } from 'react'

// (2)
function reducer(state, action) {
  // 0 is initialState
  // action is 1, which is from dispatch
  console.log(state, action) //  0 1

  return state + action
}

function DateCounter() {
  const [count, dispatch] = useReducer(reducer, 0) // (1)

  const date = new Date('june 21 2027') // *** mutate date object directly
  date.setDate(date.getDate() + count)

  // (3)
  const dec = () => {
    dispatch(-1)
  }
  const inc = () => {
    dispatch(1)
  }

  const defineCount = function () {}

  return (
    <div className='counter'>
      <div>
        <input type='range' min='0' max='10' />
      </div>

      <div>
        {/* (4) */}
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button>Reset</button>
      </div>
    </div>
  )
}

export default DateCounter

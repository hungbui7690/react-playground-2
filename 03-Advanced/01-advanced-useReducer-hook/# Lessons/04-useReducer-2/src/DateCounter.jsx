/*
  useReducer
  - convention: {type, payload}

  - with payload
    > dispatch({type: 'dec', payload: 1})
    > if (action.type === 'dec') return state - action.payload

  - no payload
    > dispatch({type: 'inc'})
    > if (action.type === 'inc') return state + 1


  *** dispatch({ type: 'setCount', payload: Number(e.target.value) })
  

*/

import { useReducer } from 'react'

function reducer(state, action) {
  // (2)
  if (action.type === 'inc') return state + action.payload
  if (action.type === 'dec') return state + action.payload
  if (action.type === 'setCount') return action.payload

  return state + action
}

function DateCounter() {
  const [count, dispatch] = useReducer(reducer, 0)

  const date = new Date('june 21 2027')
  date.setDate(date.getDate() + count)

  const dec = () => {
    dispatch({ type: 'dec', payload: -1 }) // (1a)
  }
  const inc = () => {
    dispatch({ type: 'inc', payload: 1 }) // (1b)
  }

  // *** with this, any number that we place into the input will be set to "count"
  const defineCount = function (e) {
    dispatch({ type: 'setCount', payload: Number(e.target.value) }) // (1c)
  }

  return (
    <div className='counter'>
      <div>
        <input type='range' min='0' max='10' />
      </div>

      <div>
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

/*
  Loading Questions from a Fake API
  ~~ npm i json-server
      > we have questions locally > but we want to pretend that we load data from API

  - package.json
    > "server":"json-server --watch ./src/questions.json --PORT 8000"

  ~~ npm run server
  - http://localhost:8000/
    > data will be here

*/

import { useEffect, useReducer } from 'react'
import Header from './Header'
import Main from './Main'

// (2)
const initialState = {
  questions: [],
  status: 'loading', // 'loading', 'error', 'ready', 'active', 'finished'
}

// (3)
function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' } // *** DevTools
    case 'dataFailed':
      return { ...state, status: 'error' } // *** DevTools === DT
    default:
      throw new Error('Unknown action!!!')
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState) // (4)

  // (1)
  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch((err) => dispatch({ type: 'dataFailed' }))
  }, [])

  return (
    <div className='app'>
      <Header />

      <Main>
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  )
}

/*
  Handling New Answers
  - when we click on an answer, 3 things happen:
    + correct answer + wrong answers are shown
    + point update
    + "next" button is enable

  - we finished the first point (show correct/wrong answers)
  - now, we're working "point update"

*/

import { useEffect, useReducer } from 'react'
import Header from './components/Header'
import Loader from './components/Loader'
import Error from './components/Error'
import StartScreen from './components/StartScreen'
import Question from './components/Question'

const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0, // (1)
}

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' }
    case 'dataFailed':
      return { ...state, status: 'error' }
    case 'start':
      return { ...state, status: 'active' }
    case 'newAnswer': {
      const question = state.questions.at(state.index)
      return {
        ...state,
        answer: action.payload,

        // (2) DT > end
        point:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      }
    }
    default:
      throw new Error('Unknown action!!!')
  }
}

export default function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  )
  const numQuestions = questions.length

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch((err) => {
        dispatch({ type: 'dataFailed' })
        console.log(err.message)
      })
  }, [])

  if (status === 'loading') return <Loader />
  if (status === 'error') return <Error />

  return (
    <div className='app'>
      <Header />
      {status === 'ready' && (
        <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
      )}

      {status === 'active' && (
        <Question
          question={questions[index]}
          dispatch={dispatch}
          answer={answer}
        />
      )}
    </div>
  )
}

/*
  Handling New Answers
  - when we click on an answer, 3 things happen:
    + point update
    + correct answer + wrong answers are shown
    + "next" button is enable

  - check data, we will see that the correct option is the number (or index)


  - className={`btn btn-option 
      ${idx === answer ? 'answer' : ''} 
      ${hasAnswer
        ? idx === question.correctOption
          ? 'correct'
          : 'wrong'
        : ''
    }`}

    > {idx === answer ? 'answer' : ''} >>> if user's answer === option index, then set className to "answer" > move option to the right

    > hasAnswer
        ? idx === question.correctOption
          ? 'correct'
          : 'wrong'
        : ''
      + if user answers the question, then: 
        - if idx === question.correctOption, then:
          + 'correct'
          + else, 'wrong'
      + if user not answer the question, then: ''

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
  answer: null, // (1) this is the answer from user
}

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' }
    case 'dataFailed':
      return { ...state, status: 'error' }
    case 'start':
      return { ...state, status: 'active' }
    case 'newAnswer':
      console.log(`answer: ${action.payload}`)
      return { ...state, answer: action.payload } // (2)
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

      {/* (3) passing dispatch + answer */}
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

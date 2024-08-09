/*
  Setting Up a Timer With useEffect  
  - this lesson

  Section Summary useState vs useReducer
  - theory

*/

import { useEffect, useReducer } from 'react'
import Header from './components/Header'
import Loader from './components/Loader'
import Error from './components/Error'
import StartScreen from './components/StartScreen'
import Question from './components/Question'
import NextButton from './components/NextButton'
import Progress from './components/Progress'
import FinishScreen from './components/FinishScreen'
import Timer from './components/Timer'
import Footer from './components/Footer'

const SECS_PER_QUESTION = 5 // (2) 30s

const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondRemaining: null, // (1) we won't set constant here > but need to generate the value based on the number of questions
}

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' }
    case 'dataFailed':
      return { ...state, status: 'error' }
    case 'start':
      return {
        ...state,
        status: 'active',
        secondRemaining: state.questions.length * SECS_PER_QUESTION, // (3) NEVER put 30 directly here > since later, we won't know what it is > need to create constant
      }
    case 'newAnswer': {
      const question = state.questions.at(state.index)
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      }
    }
    case 'nextQuestion':
      return { ...state, index: state.index++, answer: null }
    case 'finished':
      return {
        ...state,
        status: 'finished',
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      }
    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
        highScore: state.highScore,
      }
    case 'tick':
      return {
        ...state,
        secondRemaining:
          state.secondRemaining >= -1 && state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? 'finished' : state.status,
      }
    default:
      throw new Error('Unknown action!!!')
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highScore, secondRemaining },
    dispatch,
  ] = useReducer(reducer, initialState)
  const numQuestions = questions.length
  const maxPoints = questions.reduce((acc, cur) => {
    return (acc += cur.points)
  }, 0)

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
        <>
          <Progress
            numQuestions={numQuestions}
            index={index}
            points={points}
            maxPoints={maxPoints}
            answer={answer}
          />
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
          <Footer>
            <Timer dispatch={dispatch} secondRemaining={secondRemaining} />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              numQuestions={numQuestions}
              index={index}
            />
          </Footer>
        </>
      )}
      {status === 'finished' && (
        <FinishScreen
          points={points}
          maxPoints={maxPoints}
          highScore={highScore}
          dispatch={dispatch}
        />
      )}
    </div>
  )
}

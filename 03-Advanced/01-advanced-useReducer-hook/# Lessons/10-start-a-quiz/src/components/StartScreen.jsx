const StartScreen = ({ numQuestions, dispatch }) => {
  return (
    <div className='start'>
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React Skill</h3>
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'start' })} // (4)
      >
        Let&apos;s Start
      </button>
    </div>
  )
}

export default StartScreen

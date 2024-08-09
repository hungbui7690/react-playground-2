const NextButton = ({ dispatch, answer, index, numQuestions }) => {
  if (answer === null) return

  if (numQuestions - 1 > index)
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'nextQuestion' })}
      >
        Next
      </button>
    )

  if (numQuestions - 1 === index)
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'finished' })}
      >
        Finish
      </button>
    )
}

export default NextButton

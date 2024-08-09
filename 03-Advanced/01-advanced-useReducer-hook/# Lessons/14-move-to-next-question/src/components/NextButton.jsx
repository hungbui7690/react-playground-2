const NextButton = ({ dispatch, answer }) => {
  if (answer === null) return // *** MUST USE THIS > NOT if(!answer) > !answer doesn't work

  return (
    <button
      className='btn btn-ui'
      onClick={() => dispatch({ type: 'nextQuestion' })}
    >
      Next
    </button>
  )
}

export default NextButton

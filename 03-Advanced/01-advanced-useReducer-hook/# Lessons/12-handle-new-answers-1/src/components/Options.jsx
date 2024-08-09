const Options = ({ question, dispatch, answer }) => {
  const hasAnswer = answer !== null // (5c) user clicks on the answer

  return (
    <ul className='options'>
      {/* (5a) takeout the idx */}
      {question.options.map((option, idx) => (
        <button
          className={`btn btn-option ${idx === answer ? 'answer' : ''} ${
            hasAnswer
              ? idx === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`} // (5e) setup className
          key={option}
          disabled={hasAnswer} // (5d)
          onClick={() => dispatch({ type: 'newAnswer', payload: idx })} // (5b) payload will pass the idx as answer to reducer
        >
          {option}
        </button>
      ))}
    </ul>
  )
}

export default Options

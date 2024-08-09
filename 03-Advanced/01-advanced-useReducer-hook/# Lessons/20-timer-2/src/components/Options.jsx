const Options = ({ question, dispatch, answer }) => {
  const hasAnswer = answer !== null

  return (
    <ul className='options'>
      {question.options.map((option, idx) => (
        <button
          className={`btn btn-option ${idx === answer ? 'answer' : ''} ${
            hasAnswer
              ? idx === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          key={option}
          disabled={hasAnswer}
          onClick={() => dispatch({ type: 'newAnswer', payload: idx })}
        >
          {option}
        </button>
      ))}
    </ul>
  )
}

export default Options

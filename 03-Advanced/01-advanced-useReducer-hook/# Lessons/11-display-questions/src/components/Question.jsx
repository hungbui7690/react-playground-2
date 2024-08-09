import Options from './Options'

const Question = ({ question }) => {
  return (
    <div>
      <h4>{question.question}</h4>

      {/* (3) */}
      <Options question={question} />
    </div>
  )
}

export default Question

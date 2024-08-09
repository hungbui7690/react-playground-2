const FinishScreen = ({ points, maxPoints }) => {
  const percentage = (points / maxPoints) * 100

  return (
    <p className='result'>
      You scored <strong>{points}</strong> out of {maxPoints}{' '}
      <span>({Math.ceil(percentage)}%)</span>
    </p>
  )
}

export default FinishScreen

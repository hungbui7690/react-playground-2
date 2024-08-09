const FinishScreen = ({ points, maxPoints, highScore }) => {
  const percentage = (points / maxPoints) * 100

  let emoji

  if (percentage === 100) emoji = '😄'
  if (percentage >= 80 && percentage <= 100) emoji = '🙂'
  if (percentage >= 0 && percentage <= 50) emoji = '😓'
  if (percentage === 0) emoji = '😶'

  return (
    <>
      <p className='result'>
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{' '}
        {maxPoints}
        <span> ({Math.ceil(percentage)}%)</span>
      </p>
      <p className='highscore'>(Highscore: {highScore})</p>
    </>
  )
}

export default FinishScreen

import './StarRating.css'

const StartRating = ({ maxRating = 5 }) => {
  return (
    <main className='container'>
      <div className='starContainer'>
        {Array.from({ length: maxRating }, (_, i) => {
          return <span key={i}>S{i + 1}</span>
        })}
      </div>
      <p className='text'>10</p>
    </main>
  )
}
export default StartRating

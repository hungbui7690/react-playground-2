/*
  Handling Events the React Way
  - unlike JS, we don't use addEventListener
  - in react, we will use something similar to html inline event listener

  *** onClick + onMouseEnter

  *** DON'T DO THIS: onClick={alert('Previous')} > call right away
  *** DO THIS:       onClick={() => alert('Previous')}


  *** Either way:
      > onClick={handleNext}
      > onClick={() => handleNext()}

*/

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
]

const App = () => {
  const step = 1

  // (3a)
  const handleNext = () => {
    alert('Next')
  }

  return (
    <div className='steps'>
      <div className='numbers'>
        <div className={`${step >= 1 ? 'active' : ''}`}>1</div>
        <div className={`${step >= 2 ? 'active' : ''}`}>2</div>
        <div className={`${step >= 3 ? 'active' : ''}`}>3</div>
      </div>

      <p className='message'>
        Step {step}: {messages[step - 1]}
      </p>

      <div className='buttons'>
        <button
          style={{ backgroundColor: '#10b981', color: '#fff' }}
          onClick={() => alert('Previous')} // (1)
          onMouseEnter={() => alert('Mouse Enter')} // (2)
        >
          Previous
        </button>
        <button
          style={{ backgroundColor: '#10b981', color: '#fff' }}
          onClick={handleNext} // (3b)
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default App

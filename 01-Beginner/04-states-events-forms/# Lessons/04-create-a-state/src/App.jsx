/*
  What is State in React
  - pic

  Creating a State Variable With useState
  - pic
  - useState is what we call a hook in react
    > because it has keyword "use"
  - another hooks is: useEffect, useRef, useMemo, useCallback...

*/

import { useState } from 'react'

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
]

const App = () => {
  // const arr = useState(1) // (1) f: function that uses to update our state variable > setter function
  // console.log(arr)

  const [step, setStep] = useState(1) // (2)

  // (2a)
  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }
  const handleNext = () => {
    if (step < 3) setStep(step + 1)
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
          onClick={handlePrevious} // (2b)
        >
          Previous
        </button>
        <button
          style={{ backgroundColor: '#10b981', color: '#fff' }}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default App

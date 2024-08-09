/*
  Don't Set State Manually
  - test.name = 'Fred' 
    > this still works > but BAD PRACTICE
    > react is state immutability > this will break this rule

*/

import { useState } from 'react'

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
]

const App = () => {
  const [step, setStep] = useState(1)
  const [test] = useState({ name: 'Joe' }) // (2)

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)

    // if (step > 1) step = step + 1 // (1) DON'T DO THIS
  }
  const handleNext = () => {
    if (step < 3) setStep(step + 1)

    test.name = 'Fred' // (3) BAD PRACTICE
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
        {/* (2) */}
        {test.name}
      </p>

      <div className='buttons'>
        <button
          style={{ backgroundColor: '#10b981', color: '#fff' }}
          onClick={handlePrevious}
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

/*
  More Reusability With the children Prop
  - create Message component

  *** we can see that with the "children" props, we can create reusable components easily

*/

import { useState } from 'react'

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
]

const App = () => {
  return (
    <>
      <Steps />
    </>
  )
}

const Steps = () => {
  const [step, setStep] = useState(1)
  const [isOpen, setIsOpen] = useState(true)

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleNext = () => {
    if (step < 3) {
      setStep((s) => s + 1)
    }
  }

  return (
    <>
      <button className='close' onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>

      {isOpen && (
        <div className='steps'>
          <div className='numbers'>
            <div className={`${step >= 1 ? 'active' : ''}`}>1</div>
            <div className={`${step >= 2 ? 'active' : ''}`}>2</div>
            <div className={`${step >= 3 ? 'active' : ''}`}>3</div>
          </div>

          {/* (2) */}
          <Message step={step}>{messages[step - 1]}</Message>

          {/* OLD MESSAGE */}
          {/* <p className='message'>
            Step {step}: {messages[step - 1]}
          </p> */}

          <div className='buttons'>
            <Button textColor='#fff' bgColor='#10b981' onClick={handlePrevious}>
              <span>🎪</span> Previous
            </Button>
            <Button textColor='#fff' bgColor='#10b981' onClick={handleNext}>
              <span>🎡</span> Next
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

// (1)
const Message = ({ step, children }) => {
  return (
    <div className='message'>
      <h3>Step {step}</h3>
      {children}
    </div>
  )
}

const Button = ({ textColor, bgColor, onClick, children }) => {
  return (
    <button
      style={{ color: textColor, backgroundColor: bgColor }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default App

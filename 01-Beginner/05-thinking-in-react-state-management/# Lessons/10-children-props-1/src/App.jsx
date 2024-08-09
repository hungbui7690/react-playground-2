/*
  steps - The children Prop Making a Reusable Button
  - create Button component
    > with this setup, we have many props 
    > if the content not just have the Emoji & the Text, but has more props, then this will grow so quickly
    > next lesson

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

          <p className='message'>
            Step {step}: {messages[step - 1]}
          </p>

          <div className='buttons'>
            {/* (2) */}
            <Button
              textColor='#fff'
              bgColor='#10b981'
              onClick={handlePrevious}
              text='Previous'
              emoji='🎃'
            />
            <Button
              textColor='#fff'
              bgColor='#10b981'
              onClick={handleNext}
              text='Next'
              emoji='🎑'
            />
          </div>
        </div>
      )}
    </>
  )
}

// (1)
const Button = ({ textColor, bgColor, onClick, text, emoji }) => {
  return (
    <button
      style={{ color: textColor, backgroundColor: bgColor }}
      onClick={onClick}
    >
      <span>{emoji}</span> {text}
    </button>
  )
}

export default App

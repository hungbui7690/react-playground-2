/*
  Section Overview 
  - pic

  Build a Steps Component
  - create UI 
  - for the numbers: 
    + if we enter step 1, then step 1 will be active
    + enter step 2, then step 1 + step 2 will be active
    + enter step 3, then step 1 + step 2 + step 3 will be active


*/

const messages = [
  'Learn React ⚛️',
  'Apply for jobs 💼',
  'Invest your new income 🤑',
]

const App = () => {
  const step = 2 // (1) which step we're currently in

  return (
    <div className='steps'>
      <div className='numbers'>
        {/* (3) */}
        <div className={`${step >= 1 ? 'active' : ''}`}>1</div>
        <div className={`${step >= 2 ? 'active' : ''}`}>2</div>
        <div className={`${step >= 3 ? 'active' : ''}`}>3</div>
      </div>

      <p className='message'>
        {/* (2) */}
        Step {step}: {messages[step - 1]}
      </p>

      <div className='buttons'>
        <button style={{ backgroundColor: '#10b981', color: '#fff' }}>
          Previous
        </button>
        <button style={{ backgroundColor: '#10b981', color: '#fff' }}>
          Next
        </button>
      </div>
    </div>
  )
}

export default App

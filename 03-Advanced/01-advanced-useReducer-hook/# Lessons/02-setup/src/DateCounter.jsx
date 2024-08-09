import { useState } from 'react'

function DateCounter() {
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)

  // This mutates the date object.
  const date = new Date('june 21 2027')
  date.setDate(date.getDate() + count)

  const dec = function () {
    // setCount((count) => count - 1);
    setCount((count) => count - step)
  }

  const inc = function () {
    // setCount((count) => count + 1);
    setCount((count) => count + step)
  }

  return (
    <div className='counter'>
      <div>
        <input
          type='range'
          min='0'
          max='10'
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button
          onClick={() => {
            setCount(0)
            setStep(1)
          }}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default DateCounter

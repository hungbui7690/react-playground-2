/*
  CHALLENGE 1 Currency Converter
  
*/

import { useEffect, useState } from 'react'

// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

export default function App() {
  const [input, setInput] = useState(0)
  const [from, setFrom] = useState('USD')
  const [to, setTo] = useState('USD')
  const [output, setOutput] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function convert() {
      setIsLoading(true)

      if (from === to || !input) return

      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=100&from=${from}&to=${to}`
        )
        const data = await res.json()
        console.log(data)

        const result = (+input * data.rates[to]) / data.amount
        setOutput(result)

        setIsLoading(false)
      } catch (error) {
        console.log(error.message)
      }
    }

    convert()
  }, [from, to, input])

  return (
    <div>
      <input
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <select value={from} onChange={(e) => setFrom(e.target.value)}>
        <option value='USD'>USD</option>
        <option value='EUR'>EUR</option>
        <option value='CAD'>CAD</option>
        <option value='INR'>INR</option>
      </select>
      <select value={to} onChange={(e) => setTo(e.target.value)}>
        <option value='USD'>USD</option>
        <option value='EUR'>EUR</option>
        <option value='CAD'>CAD</option>
        <option value='INR'>INR</option>
      </select>
      <p>
        {output} {to}
      </p>
    </div>
  )
}

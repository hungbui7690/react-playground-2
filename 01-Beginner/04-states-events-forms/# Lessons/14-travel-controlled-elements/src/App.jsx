/*
  Travel List - Controlled Elements
  - input, select... maintain their own states inside the DOM (inside the HTML element itself)
    > this makes it's hard to read their values and leaves the states in the DOM
    > not ideal > since in react, we want to keep the states in a central place
      + use Controlled Elements
      + with this technique, react controls the states, not the DOM

  - after finish, we need a way to pass the data we create in the form to the PackingList > next lessons
    
  *** setQuantity(+e.target.value): convert to #

*/

import { useState } from 'react'
import './index.css'

const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
  { id: 3, description: 'Charger', quantity: 1, packed: true },
]

export default function App() {
  return (
    <div className='app'>
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  )
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>
}

// ***
function Form() {
  const [description, setDescription] = useState('') // (1)
  const [quantity, setQuantity] = useState(1)

  function handleSubmit(e) {
    e.preventDefault()

    // (5)
    if (!description) return
    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    }
    console.log(newItem)

    setDescription('')
    setQuantity(1)
  }

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>

      {/* (4) */}
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      <input
        type='text'
        placeholder='Item...'
        value={description} // (2)
        onChange={(e) => setDescription(e.target.value)} // (3) test in dev tools
      />
      <button>Add</button>
    </form>
  )
}

function PackingList() {
  return (
    <div className='list'>
      <ul>
        {initialItems.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  )
}

function Item({ item }) {
  return (
    <li className='item'>
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  )
}

function Stats() {
  return (
    <footer className='stats'>
      <em>You got everything! Ready to go ✈️</em>
    </footer>
  )
}

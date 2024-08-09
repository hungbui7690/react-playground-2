/*
  Travel List - Link about State & Lifting State Up
  - <Form onAddItem={handleAddItem} />
    > convention: onSomething

  - after done, check dev tool
  
*/

import { useState } from 'react'
import './index.css'

export default function App() {
  const [items, setItems] = useState([]) // (1) lift up here
  const handleAddItem = (item) => {
    setItems([...items, item])
  }

  return (
    <div className='app'>
      <Logo />

      {/* (2) pass as props */}
      <Form items={items} onAddItem={handleAddItem} />
      <PackingList items={items} />

      <Stats />
    </div>
  )
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>
}

// (3a) extract props
function Form({ onAddItem }) {
  const [description, setDescription] = useState('')
  const [quantity, setQuantity] = useState(1)

  function handleSubmit(e) {
    e.preventDefault()

    if (!description) return
    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now(),
    }

    onAddItem(newItem) // (3b)

    setDescription('')
    setQuantity(1)
  }

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>

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
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  )
}

// (4a) extract
function PackingList({ items }) {
  return (
    <div className='list'>
      <ul>
        {/* (4b) change from "initialItems" to "items" */}
        {items.map((item) => (
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

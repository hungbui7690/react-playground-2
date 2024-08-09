/*
  Reviewing Lifting Up State

  Deleting an Item More - ChildToParent Communication
  - we click delete button on the Item component > but the states are in the App component
    > we need to pass from App to PackingList > then from PackingList to Item

  
*/

import { useState } from 'react'
import './index.css'

const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
  { id: 3, description: 'Charger', quantity: 1, packed: true },
]

export default function App() {
  const [items, setItems] = useState(initialItems) // (5)

  const handleAddItem = (item) => {
    setItems([...items, item])
  }

  // (1)
  const handleDeleteItem = (id) => {
    console.log(id)

    const newItems = items.filter((item) => item.id !== id)

    setItems(newItems)
  }

  return (
    <div className='app'>
      <Logo />
      <Form items={items} onAddItem={handleAddItem} />

      {/* (2) */}
      <PackingList items={items} onDeleteItem={handleDeleteItem} />
      <Stats />
    </div>
  )
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>
}

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

    onAddItem(newItem)

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

// (3a)
function PackingList({ items, onDeleteItem }) {
  return (
    <div className='list'>
      <ul>
        {items.map((item) => (
          // (3b) pass to Item
          <Item key={item.id} item={item} onDeleteItem={onDeleteItem} />
        ))}
      </ul>
    </div>
  )
}

// (4a)
function Item({ item, onDeleteItem }) {
  return (
    <li className='item'>
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>

      {/* (4b) */}
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
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

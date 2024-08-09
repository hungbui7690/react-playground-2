/*
  Derived State

  Calculating Statistics as Derived State
  - (1) (2) shows how to NOT use derived state

*/

import { useState } from 'react'
import './index.css'

const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: false },
  { id: 3, description: 'Charger', quantity: 1, packed: true },
  { id: 4, description: 'Phone', quantity: 2, packed: true },
]

export default function App() {
  // const [numItems, setNumItems] = useState(0) // (1)
  const [items, setItems] = useState(initialItems)

  const handleAddItem = (item) => {
    setItems([...items, item])
    // setNumItems(numItems + 1) // (2)
  }

  const handleDeleteItem = (id) => {
    const newItems = items.filter((item) => item.id !== id)
    setItems(newItems)
  }

  const handleToggleItem = (id) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, packed: !item.packed }
      }
      return item
    })
    setItems(newItems)
  }

  return (
    <div className='app'>
      <Logo />
      <Form items={items} onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />

      {/* (3) */}
      <Stats items={items} />
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

function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className='list'>
      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  )
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li className='item'>
      <input
        type='checkbox'
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
        checked={item.packed}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  )
}

function Stats({ items }) {
  const numItems = items.length // (4a)
  const numPacked = items.filter((item) => item.packed === true).length
  const percent = (numPacked / numItems) * 100

  // (4b)
  if (!items.length)
    return (
      <footer className='stats'>
        <em> Start adding some items to your packing list! 🩹</em>
      </footer>
    )

  return (
    <footer className='stats'>
      {/* (4b) */}
      {percent === 100 ? (
        <em>You got everything! Ready to go! 🚀</em>
      ) : (
        <em>
          🧳 You have {numItems} items on your list, and you already packed{' '}
          {numPacked} ({percent}%) 💼
        </em>
      )}
    </footer>
  )
}

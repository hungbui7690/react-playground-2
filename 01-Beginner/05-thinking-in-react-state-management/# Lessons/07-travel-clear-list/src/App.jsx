/*
  Travel List - Clear the List

  - const confirmed = window.confirm('Are you sure you want to delete all items?')

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
  const [items, setItems] = useState(initialItems)

  const handleAddItem = (item) => {
    setItems([...items, item])
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

  // (1)
  const handleClearItems = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete all items?'
    )

    if (confirmed) setItems([])
  }

  return (
    <div className='app'>
      <Logo />
      <Form items={items} onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearItems={handleClearItems} // (2)
      />
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

// (3a)
function PackingList({ items, onDeleteItem, onToggleItem, onClearItems }) {
  const [sortedBy, setSortedBy] = useState('input')

  let sortedItems
  if (sortedBy === 'input') sortedItems = items
  if (sortedBy === 'description') {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description))
  }
  if (sortedBy === 'packed')
    sortedItems = items.slice().sort((a, b) => +a.packed - +b.packed)

  return (
    <div className='list'>
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>

      <div className='actions'>
        <select value={sortedBy} onChange={(e) => setSortedBy(e.target.value)}>
          <option value='input'>Sort by input order</option>
          <option value='description'>Sort by description</option>
          <option value='packed'>Sort by packed status</option>
        </select>

        {/* (3b) */}
        <button onClick={onClearItems}>Clear List</button>
      </div>
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
  const numItems = items.length
  const numPacked = items.filter((item) => item.packed === true).length
  const percent = (numPacked / numItems) * 100

  if (!items.length)
    return (
      <footer className='stats'>
        <em> Start adding some items to your packing list! 🩹</em>
      </footer>
    )

  return (
    <footer className='stats'>
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

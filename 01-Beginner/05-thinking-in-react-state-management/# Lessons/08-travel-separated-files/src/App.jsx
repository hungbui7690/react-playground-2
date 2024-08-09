/*
  Travel List - Moving Components Into Separate Files

*/

import { useState } from 'react'
import './index.css'
import Logo from './components/Logo'
import Form from './components/Form'
import PackingList from './components/PackingList'
import Stats from './components/Stats'

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
        onClearItems={handleClearItems}
      />
      <Stats items={items} />
    </div>
  )
}

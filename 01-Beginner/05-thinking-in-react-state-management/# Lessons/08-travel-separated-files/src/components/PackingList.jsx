import { useState } from 'react'
import Item from './Item'

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearItems,
}) {
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

        <button onClick={onClearItems}>Clear List</button>
      </div>
    </div>
  )
}

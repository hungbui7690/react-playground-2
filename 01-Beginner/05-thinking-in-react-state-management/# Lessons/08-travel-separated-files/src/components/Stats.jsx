export default function Stats({ items }) {
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
          {numPacked} ({percent.toFixed(2)}%) 💼
        </em>
      )}
    </footer>
  )
}

/*
  Travel List - Build Layout
  - pic

*/

import './index.css'

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

function Form() {
  return (
    <form className='add-form'>
      <h3>What do you need for your 😍 trip?</h3>
    </form>
  )
}

function PackingList() {
  return <div className='list'>Packing List</div>
}

function Stats() {
  return (
    <footer className='stats'>
      <em>You got everything! Ready to go ✈️</em>
    </footer>
  )
}

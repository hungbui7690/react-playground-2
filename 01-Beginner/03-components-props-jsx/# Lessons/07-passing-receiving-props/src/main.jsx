/*
  Passing / Receiving Props
  - passing from Menu to Pizza  

*/

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

function App() {
  return (
    <div className='container'>
      <Header />
      <Menu />
      <Footer />
    </div>
  )
}

function Header() {
  const style = {}

  return (
    <header>
      <h1 style={style}>Fast React Pizza Co.</h1>
    </header>
  )
}

// (1) passing props
function Menu() {
  return (
    <main className='menu'>
      <h2>Our menu</h2>
      <Pizza
        name='Pizza Margherita'
        ingredients='Tomato and mozarella'
        price='10'
        photoName='pizzas/margherita.jpg'
      />

      <Pizza
        name='Pizza Spinaci'
        ingredients='Tomato, mozarella, spinach, and ricotta cheese'
        price='12'
        photoName='pizzas/spinaci.jpg'
      />
    </main>
  )
}

// (2) receiving props
function Pizza(props) {
  return (
    <div className='pizza'>
      <img src={props.photoName} alt={props.name} />
      <h3>{props.name}</h3>
      <p>{props.ingredients}</p>
      <span>{Number(props.price) + 3}</span>
    </div>
  )
}

function Footer() {
  const hour = new Date().getHours()
  const openHour = 12
  const closeHour = 22
  const isOpen = hour >= openHour && hour <= closeHour

  if (!isOpen) return <footer>CLOSED</footer>

  return (
    <footer className='footer'>
      {new Date().toLocaleTimeString()} We&apos;re currently open
    </footer>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

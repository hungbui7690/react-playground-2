/*
  JS Login in Components
  - Footer

*/

import React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  return (
    <div>
      <Header />
      <Menu />
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <header>
      <h1>Fast React Pizza Co.</h1>
    </header>
  )
}

function Menu() {
  return (
    <main>
      <h2>Our menu</h2>
      <Pizza />
      <Pizza />
      <Pizza />
    </main>
  )
}

// Write some JS Logic
function Footer() {
  const hour = new Date().getHours()
  const openHour = 12
  const closeHour = 22
  const isOpen = hour >= openHour && hour <= closeHour
  console.log(isOpen)

  // if (hour >= openHour && hour <= closeHour) alert("We're currently open!")
  // else alert("Sorry we're closed")

  if (!isOpen) return <footer>CLOSED</footer>

  return (
    <footer>{new Date().toLocaleTimeString()} We&apos;re currently open</footer>
  )
}

function Pizza() {
  return (
    <div>
      <img src='pizzas/focaccia.jpg' alt='Focaccia' />
      <h3>Focaccia</h3>
      <p>Bread with italian olive oil and rosemary</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

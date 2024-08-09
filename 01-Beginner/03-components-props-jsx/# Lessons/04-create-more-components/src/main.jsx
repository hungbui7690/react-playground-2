/*
  What is JSX?
  - pic

  Create More Components
  - pic
  - create Header, Menu, Footer components

  - Structure:
    - App
      - Header
      - Menu
        - Pizza
        - Pizza
        - Pizza
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

function Footer() {
  return (
    <footer>{new Date().toLocaleTimeString()} We&apos;re currently open</footer>
  )

  // return React.createElement("footer", null, "We're currently open!");
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

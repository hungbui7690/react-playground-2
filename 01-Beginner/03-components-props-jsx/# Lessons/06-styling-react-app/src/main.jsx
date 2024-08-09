/*
  Separation of Concerns

  Styling React Apps
  - react is a library, so it doesn't have a strict way to style the app
  - we can choose how to style our app
    - inline css
    - external css

  *** the styles here are Global, not scoped to each component > later, we will learn Style Components

*/

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css' // (2) then, add className below: App, Menu, Footer

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
  // const styles = { color: 'red', fontSize: '48px', textTransform: 'uppercase' } // (1) because it is JS object > use , instead of ;
  const style = {}

  return (
    <header>
      <h1 style={style}>Fast React Pizza Co.</h1>
    </header>
  )
}

function Menu() {
  return (
    <main className='menu'>
      <h2>Our menu</h2>
      <Pizza />
      <Pizza />
      <Pizza />
    </main>
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

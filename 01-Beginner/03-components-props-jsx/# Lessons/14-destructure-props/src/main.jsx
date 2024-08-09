/*
  Destructuring Props

*/

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import pizzaData from './data'

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

function Menu() {
  const pizzas = pizzaData
  // const pizzas = []

  return (
    <main className='menu'>
      <h2>Our menu</h2>
      {pizzas.length > 0 ? (
        <ul className='pizzas'>
          {pizzaData.map((p) => {
            return <Pizza key={p.name} pizza={p} />
          })}
        </ul>
      ) : (
        <p>We&apos;re working on our menu now. Please check later 🙄</p>
      )}
    </main>
  )
}

// *** destructure
function Pizza({ pizza }) {
  return (
    <li className='pizza'>
      <img src={pizza.photoName} alt={pizza.name} />
      <div>
        <h3>{pizza.name}</h3>
        <p>{pizza.ingredients}</p>
        <span>{Number(pizza.price) + 3}</span>
      </div>
    </li>
  )
}

function Footer() {
  const hour = new Date().getHours()
  const openHour = 12
  const closeHour = 22
  const isOpen = hour >= openHour && hour <= closeHour

  return (
    <footer className='footer'>
      {isOpen ? (
        <Order closeHour={closeHour} openHour={openHour} />
      ) : (
        <p>
          We&apos;re happy to welcome you between {openHour}:00 and {closeHour}
          :00.
        </p>
      )}
    </footer>
  )

  // return React.createElement("footer", null, "We're currently open!");
}

// *** test === undefined
function Order({ closeHour, openHour, test }) {
  return (
    <div className='order'>
      <p>
        We&apos;re open from {openHour}:00 to {closeHour}:00. Come visit us or
        order online.
      </p>
      <button className='btn'>Order</button>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

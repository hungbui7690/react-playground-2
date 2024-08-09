/*
  React Fragments
  - React.Fragment === <></>

  Setting Text & ClassName Conditionally

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
        // (1) React Fragments
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>
          <ul className='pizzas'>
            {pizzaData.map((p) => {
              return <Pizza key={p.name} pizza={p} />
            })}
          </ul>
        </>
      ) : (
        <p>We&apos;re working on our menu now. Please check later 🙄</p>
      )}
    </main>
  )
}

function Pizza({ pizza }) {
  return (
    // (2) conditional className
    <li className={`pizza ${pizza.soldOut ? 'sold-out' : ''}`}>
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
}

function Order({ closeHour, openHour }) {
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

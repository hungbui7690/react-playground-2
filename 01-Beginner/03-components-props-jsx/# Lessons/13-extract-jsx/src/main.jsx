/*
  Extracting JSX into a New Component
  - create Order component
    > Order is under Footer

  *** if in close hour, "props.closeHour" in Order will return undefined > since cannot pass props from Footer (false clause in ternaries)

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

function Pizza(props) {
  // ***
  if (props.pizza.soldOut) return null

  return (
    <li className='pizza'>
      <img src={props.pizza.photoName} alt={props.pizza.name} />
      <div>
        <h3>{props.pizza.name}</h3>
        <p>{props.pizza.ingredients}</p>
        <span>{Number(props.pizza.price) + 3}</span>
      </div>
    </li>
  )
}

function Footer() {
  const hour = new Date().getHours()
  const openHour = 12
  const closeHour = 22
  const isOpen = hour >= openHour && hour <= closeHour

  // (1) passing props
  return (
    <footer className='footer'>
      <div className='order'>
        {isOpen ? (
          <Order closeHour={closeHour} />
        ) : (
          <p>
            We&apos;re happy to welcome you between {openHour}:00 and{' '}
            {closeHour}:00
          </p>
        )}
      </div>
    </footer>
  )
}

// (2)
function Order(props) {
  console.log(props.closeHour)

  // *** if in close hour, "props.closeHour" return undefined > since cannot pass props from Footer (ternaries)
  return (
    <div className='order'>
      <p>
        We&apos;re open until {props.closeHour}:00. Come visit us or order
        online.
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

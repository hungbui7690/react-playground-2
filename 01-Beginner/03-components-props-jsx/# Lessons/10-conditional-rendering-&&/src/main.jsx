/*
  Conditional Rendering with &&
  - footer  
  - pizza

  *** react renders 0 if we use "pizzas.length"
      > since "pizzas.length" === 0 === number, and react renders number
      > react doesn't render boolean
      > because of that, we need to use "pizzas.length > 0" to make it boolean
    

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
  // const pizzas = pizzaData // (2a)
  const pizzas = []

  return (
    <main className='menu'>
      <h2>Our menu</h2>

      {/* (2b) */}
      {pizzas.length > 0 && (
        <ul className='pizzas'>
          {pizzaData.map((p) => {
            return <Pizza key={p.name} pizza={p} />
          })}
        </ul>
      )}
    </main>
  )
}

function Pizza(props) {
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

  // (1)
  return (
    <footer className='footer'>
      {isOpen && (
        <div className='order'>
          <p>
            We&apos;re open until {closeHour}:00. Come visit us or order online.
          </p>
        </div>
      )}
    </footer>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

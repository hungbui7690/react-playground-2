/*
  Conditional Rendering with Multiple Returns
  - footer
  - pizzas

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
  // const pizzas = pizzaData
  const pizzas = []

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

  // ***
  if (!isOpen)
    return (
      <footer className='footer'>
        We&apos;re currently close. Please come back later 😪
      </footer>
    )

  return (
    <footer className='footer'>
      <div className='order'>
        <p>
          We&apos;re open until {closeHour}:00. Come visit us or order online 🤠
        </p>
      </div>
    </footer>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

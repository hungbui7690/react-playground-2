/*
  The Rules of JSX
  - pic

  Rendering List
  *** DON'T USE "forEach" because it doesn't return anything > need to use "map"

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
  return (
    <main className='menu'>
      <h2>Our menu</h2>

      {/* (4) change to <ul> <li> */}
      <ul className='pizzas'>
        {pizzaData.map((p) => {
          return (
            // (2) method 2
            <Pizza key={p.name} pizza={p} />

            // (1) method 1: we use "name" as key in this case
            // <Pizza
            //   key={p.name}
            //   name={p.name}
            //   ingredients={p.ingredients}
            //   price={p.price}
            //   photoName={p.photoName}
            // />
          )
        })}
      </ul>
    </main>
  )
}

function Pizza(props) {
  // (3)
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

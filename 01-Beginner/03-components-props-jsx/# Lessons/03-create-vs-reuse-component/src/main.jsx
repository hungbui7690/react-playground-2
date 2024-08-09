/*
  Components as Building Blocks
  - pic

  Create and Reuse a Component
  - copy from starter/ into public/ 

*/

import React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  return (
    <div>
      <h1>Hello World</h1>

      {/* (2) reuse */}
      <Pizza />
      <Pizza />
      <Pizza />
    </div>
  )
}

// (1)
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

/*
  Overview

  Rendering the Root component & Strict Mode
  - delete all files in src/
  - create main.js

*/

import React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  return <h1>Hello World</h1>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

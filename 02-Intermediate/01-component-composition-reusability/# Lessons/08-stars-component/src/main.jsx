import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import StartRating from './StarRating'
// import App from './App'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <StartRating maxRating={10} />
    <StartRating maxRating={5} />
    <StartRating />
    {/* <App /> */}
  </StrictMode>
)

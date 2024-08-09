import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import StarRating from './StarRating'
// import App from './App'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <StarRating maxRating={5} />
    <StarRating maxRating={10} color='crimson' size={32} />
    {/* <App /> */}
  </StrictMode>
)

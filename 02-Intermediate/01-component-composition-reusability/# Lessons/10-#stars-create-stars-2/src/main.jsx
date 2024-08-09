import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import StarRating from './StarRating'
// import App from './App'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <StarRating maxRating={10} />
    <StarRating maxRating={5} />
    <StarRating />
    {/* <App /> */}
  </StrictMode>
)

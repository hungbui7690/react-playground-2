/*
  Routing and SinglePage Applications SPAs

///////////////////////////////////

  Implementing Main Pages and Routes
  - create pages/Product + Price + Homepage

  ~~ npm i react-router-dom@6

  - setup url:
    + /product
    + /pricing
    + /

  - DT > see the tree

  *** we can also wrap in a div (below) > in this example, h1 always stays in the page

*/
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import Homepage from './pages/Homepage'

export default function App() {
  return (
    <div>
      <h1>Hello Router</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='product' element={<Product />} />
          <Route path='pricing' element={<Pricing />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

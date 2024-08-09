/*
  Styling Options For React Applications

//////////////////////////

  Using CSS Modules
  - 1 css file per component
  - avoid naming collision
      (1) create components/PageNav.module.css
      (2) import
      
      
  - check Homepage + 2 Navbars
    > they have same className, but there's no naming collision since css module creates the class name for us

  *** MUST USE .className element

  *** > set as variable <nav className={nav}>, 
      > NOT use string  <nav className='nav'>

*/

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import Homepage from './pages/Homepage'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './pages/AppLayout'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='product' element={<Product />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='app' element={<AppLayout />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

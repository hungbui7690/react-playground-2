/*
  Building the App Layout
  - ways to structure components folder
    + can divide into multiple folders > each folder is a component which contains:
      > jsx
      > module.css
      > test file
      > images
      ...


  - this lesson, we will work on the main page (App page)  
    > this page appears after user login 
    > /app === AppLayout.jsx


  - AppLayout page
    + Sidebar (left)
      > Logo
      > AppNav
      > List of Cities
      > Footer
    + Map (right)


  *** after this setup, we have: 
      - Homepage
      - Product
      - Pricing
      - Login
      - App page

*/

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Pricing from './pages/Pricing'
import Product from './pages/Product'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './pages/AppLayout'
import Login from './pages/Login'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='product' element={<Product />} />
        <Route path='app' element={<AppLayout />} />
        <Route path='login' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

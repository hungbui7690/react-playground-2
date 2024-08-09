/*
  Nested Routes and Index Route
  - pic

  *** list of urls:
      > /app/cities 
      > /app/countries
      > /app/form

  *** <Route path='app' element={<AppLayout />}>
        <Route path='cities' element={<p>List of Cities</p>} />
        <Route path='countries' element={<p>List of Countries</p>} />
        <Route path='form' element={<p>Form</p>} />
      </Route>

  *** <Outlet/> is similar to {children}


    (1) App
    (2) Sidebar: setup Outlet
        > Outlet is the child element
    (3) Test each route (ie. /app/cities...)

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

        {/* (1) */}
        <Route path='app' element={<AppLayout />}>
          <Route path='cities' element={<p>List of Cities</p>} />
          <Route path='countries' element={<p>List of Countries</p>} />
          <Route path='form' element={<p>Form</p>} />
        </Route>

        <Route path='login' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

/*
  Index Route
  
  *** this is the default element when we access /app 
      > when we go to /app, it will show XYZ
          <Route path='app' element={<AppLayout />}>  
            <Route index element={<p>XYZ</p>} />
            ...
          </Route>

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
        {/* (1a) can change path="/" to "index" > when we go to /, by default, it is <Homepage> */}
        <Route index element={<Homepage />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='product' element={<Product />} />
        <Route path='app' element={<AppLayout />}>
          {/* (1b) go to App Nav */}
          <Route index element={<p>XYZ</p>} />
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

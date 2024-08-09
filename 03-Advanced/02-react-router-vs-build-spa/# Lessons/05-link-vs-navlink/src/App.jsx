/*
  Linking Between Routes With Link and NavLink
  (1) Homepage: test Link
  (2) create components/PageNav
  (3) add PageNav to all pages

  *** <a href='/pricing'>Pricing</a>
        > this will make the page refresh 
        > uses for external page

  *** Link: uses for internal page
      > if we check by DT, we see only the last component changes when we click on the link

  *** Instead of "Link", we can use "NavLink" > with this, it auto adds the class="active" for us when we're at current url

*/

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import Homepage from './pages/Homepage'
import PageNotFound from './pages/PageNotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='product' element={<Product />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

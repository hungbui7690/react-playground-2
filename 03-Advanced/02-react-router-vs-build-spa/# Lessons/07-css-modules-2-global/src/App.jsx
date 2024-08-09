/*
  Css Modules
  - if we want to set global class in .module.css file > we need to use function 
    > PageNav.module.css
    > apply in Homepage h1 tag

  
  - .active does not work in this case, because it will add postfix for .nav & .active
      + .nav .active {}

  - so, we need to add global for .active
      + .nav :global(.active) {}
}
}

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

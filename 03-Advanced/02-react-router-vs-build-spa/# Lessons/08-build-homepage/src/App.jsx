/*
  Building the Pages
  - images are in public/
  - pages/Homepage

  - if we check /pages/Homepage.module.css, we can see that all the styles here will the className before the element name (i.e. .homepage ul)

  - use global className in Homepage
      <Link to='app' className='cta'>
        Start Tracking Now
      </Link>

*/

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import AppLayout from './pages/AppLayout'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='app' element={<AppLayout />} />
      </Routes>
    </BrowserRouter>
  )
}

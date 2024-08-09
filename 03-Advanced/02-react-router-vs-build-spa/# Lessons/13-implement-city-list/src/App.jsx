/*
  Implementing the Cities List
  - create CitiesList component
    > add to Route


  ~~ npm i json-server
    > "server": "json-server ./src/cities.json --port 8000 --delay 500",
    > --delay, -d 500: Add delay to responses (ms) > we want to simulate the real situation > take half second to fetch the data
    > new version doesn't support --delay

  - we need the cityList in the city component > but later, we also need it in some other places > put in the App.jsx (parent)


  *** const formatDate = (date) =>
        new Intl.DateTimeFormat('en', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }).format(new Date(date))

  *** Country Emoji:
      > Chrome: just can display 2 character codes
      > Firefox: can display normally
      >> Because of that, in this lesson, we will use "image url" instead of "emoji"
      >> https://www.countryflags.com/ > icon
      >> https://emojipedia.org/flags > emoji

  *** try to temp remove all the cities in data file to test the Message component

*/

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Pricing from './pages/Pricing'
import Product from './pages/Product'
import PageNotFound from './pages/PageNotFound'
import AppLayout from './pages/AppLayout'
import Login from './pages/Login'
import CityList from './components/CityList'
import { useEffect, useState } from 'react'

const BASE_URL = 'http://localhost:8000' // (1)

export default function App() {
  const [cities, setCities] = useState([]) // (2)
  const [isLoading, setIsLoading] = useState(false)

  // (3) DT
  useEffect(() => {
    const fetchCities = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        setCities(data)
      } catch (error) {
        alert(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCities()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='product' element={<Product />} />
        <Route path='app' element={<AppLayout />}>
          {/* (4) pass */}
          <Route
            index
            element={<CityList isLoading={isLoading} cities={cities} />}
          />
          <Route
            path='cities'
            element={<CityList isLoading={isLoading} cities={cities} />}
          />

          <Route path='countries' element={<p>List of Countries</p>} />
          <Route path='form' element={<p>Form</p>} />
        </Route>

        <Route path='login' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

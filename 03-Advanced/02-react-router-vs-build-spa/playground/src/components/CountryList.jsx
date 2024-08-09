import Spinner from './spinner/Spinner'
import styles from './CountryList.module.css'
import CountryItem from './CountryItem'
import Message from './Message'

// (2)
function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />

  if (cities.length === 0)
    return (
      <Message message='Add your first city by clicking on a city on the map' />
    )

  // Method 2:
  const unique = cities.reduce((acc, cur) => {
    return [...acc, cur.country]
  }, [])
  console.log(unique)

  // Method 1: we use reduce() to get back the unique countries
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }]
    else return arr
  }, [])

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  )
}

export default CountryList

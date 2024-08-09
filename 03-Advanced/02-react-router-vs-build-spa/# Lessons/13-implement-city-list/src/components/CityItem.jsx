import { Link } from 'react-router-dom'
import styles from './CityItem.module.css'

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))

// (6)
function CityItem({ city }) {
  const { cityName, date, emoji } = city

  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>
        <img src={emoji} alt='' />
      </span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>({formatDate(date)})</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  )
}

export default CityItem
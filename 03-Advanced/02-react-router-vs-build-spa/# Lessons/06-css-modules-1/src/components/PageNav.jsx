import { NavLink } from 'react-router-dom'
import styles from './PageNav.module.css' // (2)

const PageNav = () => {
  return (
    // (3) apply to the top element
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
        <li>
          <NavLink to='/pricing'>Pricing</NavLink>
        </li>
        <li>
          <NavLink to='/product'>Product</NavLink>
        </li>
        <li>
          <NavLink to='/app'>App Layout</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default PageNav

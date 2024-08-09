import { NavLink } from 'react-router-dom'
import { nav } from './AppNav.module.css'

const AppNav = () => {
  return (
    <nav className={nav}>
      <ul>
        <h2>App Navigation</h2>
        <li>
          <NavLink to='/'>Home</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default AppNav

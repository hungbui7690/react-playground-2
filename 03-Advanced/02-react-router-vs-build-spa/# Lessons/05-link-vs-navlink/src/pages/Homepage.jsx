import { Link } from 'react-router-dom'
import PageNav from '../components/PageNav'

const Homepage = () => {
  return (
    <div>
      <PageNav />
      <h1>WorldWise</h1>
      <Link to='/pricing' className='link'>
        Pricing
      </Link>
    </div>
  )
}

export default Homepage

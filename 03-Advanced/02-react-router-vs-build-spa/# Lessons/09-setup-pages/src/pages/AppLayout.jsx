import PageNav from '../components/PageNav'
import { app } from './AppLayout.module.css'

const AppLayout = () => {
  return (
    <div className={app}>
      <PageNav />
      AppLayout
    </div>
  )
}

export default AppLayout

import './styles/index.scss'
import './styles/_theme.scss'

import { Route, Routes } from 'react-router-dom'

import styles from './App.module.scss'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import CreateEvent from './pages/CreateEvent'
import Dashboard from './pages/Dashboard'
import Drinks from './pages/Drinks'
import EventDetail from './pages/EventDetail'
import GalleryPage from './pages/GalleryPage'
import Home from './pages/Home'
import InvitePage from './pages/InvitePage'
import SSHome from './pages/SSHome'
import Wishlist from './pages/Wishlist'

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.headerApp}>
        <Navbar />
      </header>
      <main className={styles.mainApp}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/secretsanta' element={<SSHome />} />
          <Route path='/event' element={<CreateEvent />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/dashboard/:event_id' element={<EventDetail />} />
          <Route path='/peets' element={<GalleryPage />} />
          <Route path='/drinks' element={<Drinks />} />
          <Route path='/wishlist/:guest_code' element={<Wishlist />} />
          <Route path='/invite/:invite_id' element={<InvitePage />} />
        </Routes>
      </main>
      <footer className={styles.footerApp}>
        {' '}
        <Footer />
      </footer>
    </div>
  )
}

export default App

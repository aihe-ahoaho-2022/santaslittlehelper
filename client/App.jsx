import { Route, Routes } from 'react-router-dom'

import Navbar from './components/Navbar'
import CreateEvent from './pages/CreateEvent'
import Dashboard from './pages/Dashboard'
import Drinks from './pages/Drinks'
import EventDetail from './pages/EventDetail'
import Home from './pages/Home'
import InvitePage from './pages/InvitePage'
import Wishlist from './pages/Wishlist'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/event' element={<CreateEvent />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dashboard/:event_id' element={<EventDetail />} />
        {/* <Route path='/Wishlist/:guest_code' element={<Wishlist />} /> */}
        <Route path='/drinks' element={<Drinks />} />
        <Route path='/wishlist/:guest_code' element={<Wishlist />} />
        <Route path='/invite/:invite_id' element={<InvitePage />} />
      </Routes>
    </>
  )
}

export default App

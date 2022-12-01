import { Route, Routes } from 'react-router-dom'

import CreateEvent from './pages/CreateEvent'
import Dashboard from './pages/Dashboard'
import EventDetail from './pages/EventDetail'
import InvitePage from './pages/InvitePage'
import Wishlist from './pages/Wishlist'

function App() {
  return (
    <Routes>
      <Route path='/event' element={<CreateEvent />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/invite/:invite_code' element={<InvitePage />} />
      <Route path='/dashboard/:event_id' element={<EventDetail />} />
      <Route path='/Wishlist/:guest_code' element={<Wishlist />} />
    </Routes>
  )
}

export default App

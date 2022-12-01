// ROUTE example for this page: http://localhost:5173/invite/0d05db6b-d332-4ebc-ab28-aedf056706fc
import { useEffect, useState } from 'react'
//import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { getInviteApi } from '../apiClient/invite.js'

export default function InviteForm(props) {
  const [newGuest, setNewGuest] = useState({
    name: '',
    guest_code: '',
  })
  useEffect(() => {
    getInviteApi()
      .then((guest) => {
        setNewGuest(guest)
      })
      .catch((err) => {
        err.message
      })
  })
  function handleChange(event) {
    setNewGuest(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    props.onAddGuest(newGuest)
    const guest_code = uuidv4()
    setNewGuest('')
    console.log(newGuest)
  }

  return (
    <div>
      <h1>Invite Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='new-guest'>What is your name?</label>
        <input
          type='text'
          name='new-guest'
          id='new-guest'
          value={newGuest.name}
          onChange={handleChange}
        ></input>

        <button type='submit'>ACCEPT</button>
      </form>
    </div>
  )
}

//like the app of invite form

// 1. get the invite code from the url
// 2. fetch the event data from the api to show the event details. budget, date, name.
// 3. create a form to enter the guest name
// 4. submit the form to create a wishlist for the guest
// 5. navigate to the wishlist page

// handleSubmit should be a function that creates a new guest_code using uuid and
// uses an Api call to add the name, guest_code and event_id to create a new wishlist in the database.
// Then it should navigate to the wishlist page using the guest_code as the url parameter.

// The api functions should be Called getEvent and createWishlist, they should be in the api.js file.
// The getEvent function should take the event_id as a parameter and return the event data.
// The createWishlist function should take the name, guest_code and event_id as parameters and return the new wishlist data.
// The navigate function should be imported from react-router-dom and used to navigate to the wishlist page.

// The event data should be stored in a state variable called event.

// the routes should be:
// /invite/:event_id
// /wishlist/:guest_code

// The event_id and guest_code should be stored in the url parameters.

// to get the event_id from the url you can use the useParams hook from react-router-dom like this:
// const { event_id } = useParams()

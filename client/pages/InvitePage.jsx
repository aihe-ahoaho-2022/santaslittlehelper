// ROUTE example for this page: http://localhost:5173/invite/0d05db6b-d332-4ebc-ab28-aedf056706fc

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { createInvite } from '../apiClient/invite.js'

export default function Invite() {
  const [newInvite, setNewInvite] = useState({
    name: '',
    guest_code: '',
  })

  // useEffect(() => {
  //   getInviteApi()
  //     .then((invite) => {
  //       setNewInvite(invite)
  //     })
  //     .catch((err) => {
  //       err.message
  //     })
  // })

  function handleChange(event) {
    const { name } = event.target
  }

  function handleSubmit(e) {
    e.preventDefault()
    const guest_code = uuidv4()
    setNewInvite({ name: e.target.name })
    console.log('name', e.target.name, e.target.id)
  }

  return (
    <>
      <div>Invite Page</div>
      <input type='text' id='name'></input>
      {/* <input type='text' id='budget'></input> */}
      <button onSubmit={handleSubmit}>ACCEPT</button>
    </>
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

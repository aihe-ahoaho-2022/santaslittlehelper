import {
  MantineProvider,
  MultiSelect,
  NumberInput,
  TextInput,
} from '@mantine/core'
import { Calendar } from '@mantine/dates'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { createEvent } from '../apiClient/event.js'

const Event = () => {
  const [date, setDate] = useState(null)
  const [eventCreated, setEventCreated] = useState(false)
  const [link, setLink] = useState(null)
  const [budget, setBudget] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const invite_code = uuidv4()

    setLink(invite_code)

    const host_id = 69

    const event = { name, date, budget, invite_code, host_id }
    console.log(event, 'EVENT')
    const newEvent = await createEvent(event)
    setEventCreated(true)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(`http://elf.co/secret-santa/${link}`)
  }

  return (
    <div>
      {!eventCreated ? (
        <>
          <div className='create-event'>
            <h1>Create a New Event</h1>
          </div>
          <div className='event-container'>
            <form onSubmit={handleSubmit}>
              <div className='calender'></div>
              <div className='inputBoxes'>
                <MantineProvider
                  theme={{
                    components: {
                      InputWrapper: {
                        defaultProps: {
                          inputWrapperOrder: [
                            'label',
                            'error',
                            'input',
                            'description',
                          ],
                        },
                      },

                      Input: {
                        defaultProps: {
                          variant: 'filled',
                        },
                      },
                    },
                  }}
                >
                  <TextInput
                    label='Event Name'
                    placeholder='ex: super special birthday party'
                    description='create your event name above.'
                    value={name}
                    name='name'
                    onChange={(e) => setName(e.target.value)}
                  />
                  <NumberInput
                    mt='xl'
                    label='Gift Budget'
                    placeholder='ex: 30'
                    description='enter gift budget above.'
                    value={budget}
                    onChange={(e) => setBudget(e)}
                  />
                  <Calendar
                    name='date'
                    required
                    value={date}
                    onChange={(e) => setDate(e)}
                  />
                </MantineProvider>
                <button>Create Event</button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <div className='event-created'>
          <h2>Event Created</h2>
          <p>Share this link with your guests</p>
          <a href={`http://localhost:5173/invite/${link}`}>
            http://elf.co/secret-santa/{link}
          </a>
          <button className='create-event-button' onClick={copyLink}>
            Copy Link
          </button>
          <Link to='/dashboard'>Go to Dashboard</Link>
        </div>
      )}
    </div>
  )
}

export default Event

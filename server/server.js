import 'dotenv/config'

import express from 'express'
import path from 'path'

import drinksRoute from './routes/drinks.js'
import eventRoute from './routes/event.js'
import guestRoute from './routes/guest.js'
import inviteRoute from './routes/invite.js'
import peetsRoute from './routes/peets.js'

const server = express()

server.use(express.urlencoded({ extended: true }))
server.use(express.json())

server.get('/api/hello-world', (req, res) => {
  res.json({ message: 'Hello World' })
})

server.use('/api/v1/drinks', drinksRoute)
server.use('/api/v1/event', eventRoute)
server.use('/api/v1/wishlist', guestRoute)
server.use('/api/v1/invite', inviteRoute)
server.use('/api/v1/peets', peetsRoute)

server.use('/api/*', (req, res) => {
  res.sendStatus(404)
})

const env = process.env.NODE_ENV || 'development'
const isDev = env === 'development'

if (!isDev) {
  server.use(express.static(path.resolve('dist')))
  server.use('*', (req, res) => {
    res.sendFile(path.resolve('dist/index.html'))
  })
} else {
  server.use('*', (req, res) => {
    res.status(404).send('Not Found: Running in dev mode')
  })
}

export default server

//DRINKS API BELOW//

import express from 'express'
const router = express.Router()
import request from 'superagent'

router.get('/', (req, res) => {
  request
    .get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then((data) => {
      console.log(data.body)
      res.json(data.body)
    })
    .catch((err) => {
      console.error(err)
      res.sendStatus(500)
    })
})
export default router

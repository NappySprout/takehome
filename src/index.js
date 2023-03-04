require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const knex = require('./db').knex;
app.use(express.json());
app.use('/auth', require('./routes/auth/auth.js'))
app.use('/api', require('./routes/api/api.js'))

app.get('/', async (req, res) => {
  res.send(await knex.select('*').from('users'))
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  require('./db').createdb()
})

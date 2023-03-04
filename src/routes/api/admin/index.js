const knex = require('../../../db').knex
const express = require('express')
const router = express.Router()
const {changerole, remove} = require('./handler')

router.use(async (req,res,next) => {
  const {email} = req.decodedJwt
  const query = await knex.select('role').from('users').where({email})
  if (query.length != 1) {return res.status(401).send("email in token does not exist")}
  const role = query[0].role
  if (role!='ADMIN') {return res.status(401).send('role not admin')}
  next()
})
router.post('/changerole', changerole)
router.delete('/remove', remove)

module.exports = router
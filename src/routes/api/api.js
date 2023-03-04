const knex = require('../../db').knex
const express = require('express')
const router = express.Router()
const {get, update, remove, reset } = require('./handler')
const admin = require('./admin')
const jwt = require('jsonwebtoken');

router.use(async(req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (!bearerHeader) {return res.status(403).send('bearer token in authorization header required')}
  const bearer = bearerHeader.split(' ');
  const bearerToken = bearer[1];
  if (!bearerToken) {return res.status(403).send('token missing')}
  try {
    var decoded = jwt.verify(bearerToken, process.env.SECRET);
    req.decodedJwt = decoded
  } catch(err) {
    return res.status(403).send('invalid token')
  }
  const {email} = req.decodedJwt
  const query = await knex.select('*').from('users').where({email});
  if (query.length != 1) {return res.status(403).send('email in token does not exist')};//guaranteed at most one 
  next();
})
router.get('/get', get)
router.post('/update', update)
router.post('/reset', reset)
router.delete('/remove', remove)
router.use('/admin', admin)


module.exports = router
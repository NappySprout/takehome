const express = require('express')
const router = express.Router()
const {get, update, remove } = require('./handler')
const jwt = require('jsonwebtoken');

router.use((req, res, next) => {
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
  next();
})
router.get('/get', get)
router.get('/update', update)
router.get('/remove', remove)


module.exports = router
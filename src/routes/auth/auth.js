const express = require('express')
const router = express.Router()
const {signup, login} = require('./handler')

console.log(signup)
console.log(login)
router.post('/signup',signup)
router.post('/login', (login))

module.exports = router
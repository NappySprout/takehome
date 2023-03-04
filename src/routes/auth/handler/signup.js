const knex = require('../../../db').knex
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const signup = async (req,res) => {
  const {email, password} = req.body
  
  //validates email and passwords
  if (email === "" || password === "") { return res.status(403).send("please ensure email or password not empty")}
  if (email === undefined || password === undefined) {return res.status(403).send("please ensure email and password field")}

  let query = await knex.select("email").from("users").where({email})
  //validates if email not in db
  if (query.length > 0) {return res.status(403).send("email already exist")}

  //hash password
  const hashed = crypto.createHash('SHA256').update(password).digest('base64')

  //insert email and hashed pw in db
  const val = await knex('users').returning(['email', 'role']).insert({email, password: hashed, role: 'MEMBER'})
  res.json(jwt.sign(val[0], process.env.SECRET))
}

module.exports = signup
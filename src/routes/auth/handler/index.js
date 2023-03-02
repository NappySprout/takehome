const knex = require('../../../db').knex
const crypto = require('crypto');
var jwt = require('jsonwebtoken');

const signup = async (req,res) => {
  //extracts email and password
  const {email, password} = req.body
  
  //validates email and passwords
  if (email === "" || password === "") { return res.status(403).send("please ensure email or password not empty")}
  if (email === undefined || password === undefined) {return res.status(403).send("please ensure email and password field")}

  let query = await knex.select("email").from("users")

  //validates if email not in db
  if (query.map(obj => obj.email).includes(email)) {return res.status(403).send("email already exist")}

  //hash password
  const hashed = crypto.createHash('SHA256').update(password).digest('base64')

  //insert email and hashed pw in db
  const val = await knex('users').returning(['email', 'role']).insert({email, password: hashed, role: 'MEMBER', firstname:'', lastname:''})
  res.json(jwt.sign(val[0], process.env.SECRET))
}

const login = async (req,res) => {
  //extracts email and password
  const {email, password} = req.body
  
  //validates email and passwords
  if (email === "" || password === "") { return res.status(403).send("please ensure email or password not empty")}
  if (email === undefined || password === undefined) {return res.status(403).send("please ensure email and password field")}

  //guaranteed at most 1 due to unique email
  let query = await knex.select("password", "role").from("users").where({email})
  if(query.length == 0) {return res.status(401).send("user does not exist")}

  //compare password
  const {password: ciphertext, role} = query[0]
  const hashed = crypto.createHash('SHA256').update(password).digest('base64')
  if (ciphertext != hashed) {return res.status(401).send("invalid password")}
  
  //send jwt
  res.json(jwt.sign({email, role}, process.env.SECRET))
}


module.exports = {login, signup}
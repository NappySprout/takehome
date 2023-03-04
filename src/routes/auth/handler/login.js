const knex = require('../../../db').knex
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const login = async (req,res) => {
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

module.exports = login
const knex = require('../../../db').knex
const crypto = require('crypto');

const get = async (req,res) => {
  const { email } = req.decodedJwt
  const query = await knex.select('firstname', 'lastname','email', 'role', 'designation', 'company').from('users').where({email})
  return res.send(query)
}
const update = async (req,res) => {
  const { email } = req.decodedJwt;
  const keys = Object.keys(req.body);
  if (keys.length === 0) {return res.send("nothing updated")}
  if (keys.some(k => !(['firstname', 'lastname','email', 'role', 'designation', 'company'].includes(k)) )) {
    return res.status(403).send("wrong keys")
  }
  if (keys.includes('email')) {
    let query = await knex.select("email").from("users").where({email:req.body.email})
    if (query.length > 0) {return res.status(403).send("email already exist")}
  }
  await knex('users').update(req.body).where({email})
  return res.send("updated")
}
const remove = async (req,res) => {
  const { email } = req.decodedJwt;
  const { password } = req.body;

  if (!password) {return res.status(403).send('password field required')};

  const hashed = crypto.createHash('SHA256').update(password).digest('base64');
  const query = await knex.select('password').from('users').where({email});

  if (query.length != 1) {return res.status(403).send('email do not exist')};//guaranteed at most one 
  if (hashed != query[0].password) {return res.status(403).send('wrong password')};

  await knex('users').where({email}).del()
  res.send("remove")
}

module.exports = {get, update, remove}
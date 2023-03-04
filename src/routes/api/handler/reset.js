const knex = require('../../../db').knex
const crypto = require('crypto');

const reset = async (req,res) => {
  const { email } = req.decodedJwt;
  const { oldpassword, newpassword } = req.body;

  if (!oldpassword) {return res.status(403).send('oldpassword field required')};
  if (!newpassword) {return res.status(403).send('newpassword field required')};
  if (Object.keys(req.body).length != 2) {return res.status(403).send('only oldpassword and newpassword field is allowed')};

  const hashed = crypto.createHash('SHA256').update(oldpassword).digest('base64');
  const query = await knex.select('password').from('users').where({email});

  if (query.length != 1) {return res.status(403).send('email do not exist')};//guaranteed at most one 
  if (hashed != query[0].password) {return res.status(403).send('wrong old password')};

  await knex('users').where({email}).update({password: crypto.createHash('SHA256').update(newpassword).digest('base64')})
  res.send("reset")
}

module.exports = reset
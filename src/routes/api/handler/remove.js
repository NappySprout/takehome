const knex = require('../../../db').knex
const crypto = require('crypto');

const remove = async (req,res) => {
  const { email } = req.decodedJwt;
  const { password } = req.body;

  if (!password) {return res.status(403).send('password field required')};

  const hashed = crypto.createHash('SHA256').update(password).digest('base64');
  if (hashed != query[0].password) {return res.status(403).send('wrong password')};

  await knex('users').where({email}).del()
  res.send("remove")
}

module.exports = remove
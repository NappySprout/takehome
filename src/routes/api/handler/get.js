const knex = require('../../../db').knex

const get = async (req,res) => {
  const { email } = req.decodedJwt
  const query = await knex.select('firstname', 'lastname','email', 'role', 'designation', 'company').from('users').where({email})
  return res.send(query)
}

module.exports = get;
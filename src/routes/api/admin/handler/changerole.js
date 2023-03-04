const knex = require('../../../../db').knex
const changerole = async (req, res) => {
  const {email, role} = req.body
  if (!email) {return res.status(403).send("email field missing")}
  if (!['ADMIN', 'MEMBER','TECHNICIAN'].includes(role)) {return res.status(403).send("inappropriate roles")}
  await knex('users').where({email}).update({role})
  return res.send("user role updated")
}

module.exports = changerole
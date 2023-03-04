const knex = require('../../../../db').knex
const remove = async (req, res) => {
  const {email} = req.body
  if (!email) {return res.status(403).send("email field missing")}
  await knex('users').where({email}).del()
  return res.send("user deleted")
}

module.exports = remove
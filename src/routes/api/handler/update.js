const knex = require('../../../db').knex

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

module.exports = update
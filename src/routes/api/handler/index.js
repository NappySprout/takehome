const get = (req,res) => {
  res.send(req.decodedJwt)
}
const update = (req,res) => {
  res.send("update")
}
const remove = (req,res) => {
  res.send("remove")
}

module.exports = {get, update, remove}
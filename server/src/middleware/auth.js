const jwt = require('jsonwebtoken')

function auth(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader)
    return res.status(401).send({ error: "Acesso negado" })

  const partes = authHeader.split(' ')

  if (!partes.length === 2)
    return res.status(401).send({ error: "Acesso negado" })

  const [bearer, token] = partes

  if (!/^Bearer$/i.test(bearer))
    return res.status(401).send({ error: "Acesso negado" })

  try {
    const usuarioVerificado = jwt.verify(token, process.env.TOKEN_SECRET)
    req.usuario = usuarioVerificado
    return next()
  }
  catch (error) {
    return res.status(401).send({ error: "Acesso negado" })
  }
}

module.exports = auth
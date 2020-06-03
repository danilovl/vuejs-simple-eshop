const jwt = require('jsonwebtoken')

const APP_SECRET = 'myappsecret'
const USERNAME = 'admin'
const PASSWORD = 'admin'

module.exports = function (req, res, next) {
  if (req.url.startsWith('/verify-token') && req.method === 'POST') {
    let token = req.headers.authorization
    if (token != null && token.startsWith('Authentication<')) {
      token = token.substring(15, token.length - 1)
      try {
        jwt.verify(token, APP_SECRET)
        res.json({ success: true })
        return
      } catch (err) {
      }
    }
    res.json({ success: false })
    return
  }

  if ((req.url === '/api/login' || req.url === '/login') && req.method === 'POST') {
    if (req.body != null && req.body.username === USERNAME && req.body.password === PASSWORD) {
      const token = jwt.sign({ data: USERNAME, expiresIn: '1h' }, APP_SECRET)
      res.json({ success: true, token: token })
    } else {
      res.json({ success: false })
    }
    res.end()

    return
  }

  if (req.url.startsWith('/products') && req.method !== 'GET') {
    let token = req.headers.authorization
    if (token != null && token.startsWith('Authentication<')) {
      token = token.substring(15, token.length - 1)
      try {
        jwt.verify(token, APP_SECRET)
        next()
        return
      } catch (err) {
      }
    }
    res.statusCode = 401
    res.end()
    return
  }

  next()
}

require('dotenv').config();

const nodemailer = require('nodemailer')
const path = require('path')
const hbs = require('nodemailer-express-handlebars')

const { host, port, user, pass } = require('../config/smtp')

const transport = nodemailer.createTransport({
  host,
  port,
  secure: false,
  auth: {
    user,
    pass,
  },
  tls: {
    rejectUnauthorized: false,
  }
})

transport.use('compile', hbs({
  viewEngine: {
    defaultLayout: undefined,
    partialsDir: path.resolve('src/resources/mail')
  },
  viewPath: path.resolve('src/resources/mail'),
  extName: '.html'
}))

module.exports = transport
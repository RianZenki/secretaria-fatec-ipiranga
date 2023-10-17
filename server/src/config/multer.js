const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'temp', 'uploads'),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'temp', 'uploads'))
    },
    filename: (req, file, cb) => {
      const hash = crypto.randomBytes(16).toString('hex') + Date.now()
      const extensao = file.originalname.split('.').pop()

      const nomeArquivo = `${hash}.${extensao}`

      cb(null, nomeArquivo)
    }
  }),
  limits: {
    fileSize: 2 * 1024 * 1024 // 2 mb
  },
  fileFilter: (req, file, cb) => {
    const formatosPermitidos = [
      'image/jpeg',
      'image/png',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]

    if (formatosPermitidos.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error("Tipo inválido de arquivo"))
    }
  }
}
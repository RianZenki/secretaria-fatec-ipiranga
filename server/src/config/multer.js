import multer from 'multer'
import path from 'path'
import crypto from 'crypto'
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export const multerConfig = {
  dest: path.resolve(__dirname, '..', '..', 'temp', 'uploads'),
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'temp', 'uploads'))
    },
    filename: (req, file, cb) => {
      const fileName = file.originalname.split('.')
      const extensao = fileName.pop()
      const originalName = fileName.join('.')

      const nomeArquivo = `${originalName}_${Date.now()}.${extensao}`

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
      'text/plain',
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
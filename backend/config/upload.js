const multer = require('multer');

// CONFIGURATION FOR MULTER

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../dist/uploadTender')
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1]
    cb(null, `${ file.fieldname }-${ Date.now() }.${ ext }`)
  }
})

// MULTER FILTER

const multerFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[1] === 'pdf')
  return cb(null, true)
  return cb(new Error('This is not a pdf file'), false)
}

// CALLING MULTER

exports.upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
})
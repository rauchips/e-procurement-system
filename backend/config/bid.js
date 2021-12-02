const multer = require('multer');

// CONFIGURATION FOR MULTER

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../dist/uploadBid')
  },
  filename: (req, file, cb) => {
    const filename = file.originalname.toLowerCase()
    cb(null, filename)
  }
})

// MULTER FILTER

const multerFilter = (req, file, cb) => {
  if (file.mimetype.split('/')[1] === 'pdf')
  return cb(null, true)
  return cb(new Error('This is not a pdf file'), false)
}

// CALLING MULTER

exports.bid = multer({
  storage: multerStorage,
  fileFilter: multerFilter
})
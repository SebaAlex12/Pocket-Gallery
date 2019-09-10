import multer = require("multer");
import fs = require("fs");

// Set storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./client/public/photos/" + req.params.dest.replace("-", "/"));
  },
  filename: function(req, file, cb) {
    console.log("file arguments:", file);
    // null as first argument means no error
    cb(null, Date.now() + "-" + file.originalname);
  }
});

// Init upload
export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000
  },
  fileFilter: function(req, file, cb) {
    sanitizeFile(file, cb);
  }
}).array("files");

function sanitizeFile(file, cb) {
  // Define the allowed extension
  let fileExts = ["png", "jpg", "jpeg", "gif"];
  // Check allowed extensions
  let isAllowedExt = fileExts.includes(
    file.originalname.split(".")[1].toLowerCase()
  );
  // Mime type must be an image
  let isAllowedMimeType = file.mimetype.startsWith("image/");
  if (isAllowedExt && isAllowedMimeType) {
    return cb(null, true); // no errors
  } else {
    // pass error msg to callback, which can be displaye in frontend
    cb("Error: File type not allowed!");
  }
}

// export const resize(path, format, width, height) {
//   const readStream = fs.createReadStream(path)
//   let transform = sharp()

//   if (format) {
//     transform = transform.toFormat(format)
//   }

//   if (width || height) {
//     transform = transform.resize(width, height)
//   }

//   return readStream.pipe(transform)
// }

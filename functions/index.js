const functions = require('firebase-functions');
const { Storage } = require('@google-cloud/storage');
const os = require('os');
const path = require('path');
const spawn = require('child-process-promise').spawn;
const cors = require("cors")({ origin: true });
const Busboy = require("busboy");
const fs = require("fs");
const gcconfig = {
  projectId: "fb-cloud-functions-demo",
  keyFilename: "fb-cloud-functions-demo-firebase-adminsdk-km39q-405896eddb.json"
};
const gcs = new Storage(gcconfig);


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.onFileChange = functions.storage.object().onFinalize(event => {
  console.log(event)
 const bucket = event.bucket
 const type = event.contentType
 const filePath = event.name
 console.log(bucket, type, filePath, 'File change detected, function execution initialized')

 if(path.basename(filePath).startsWith('resized-')){
  console.log('We have already renamed this file!')
  return
 }

 const imageBucket = gcs.bucket(bucket);
 const tempFilePath = path.join(os.tmpdir(), path.basename(filePath))
 const metadata = { contentType: type }
 return imageBucket.file(filePath).download({
  destination: tempFilePath
 }).then(() => {
  return spawn('convert', [tempFilePath, '-resize', '500x500', tempFilePath])
  }).then (() => { 
  return imageBucket.upload(tempFilePath, {
    destination: 'resized-' + path.basename(filePath),
    metadata: metadata
  });
 });
});

exports.onFileDelete = functions.storage.object().onDelete(event => {
 console.log(event)
 return;
});

exports.uploadFile = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== "POST") {
      return res.status(500).json({
        message: "Not allowed"
      });
    }
    const busboy = new Busboy({ headers: req.headers });
    let uploadData = null;

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      console.log(mimetype, busboy)
      const filepath = path.join(os.tmpdir(), filename);
      uploadData = { file: filepath, type: mimetype };
      file.pipe(fs.createWriteStream(filepath));
    });

    busboy.on("finish", () => {
      const bucket = gcs.bucket("fir-demo-85716.appspot.com");
      bucket
        .upload(uploadData.file, {
          uploadType: "media",
          metadata: {
            metadata: {
              contentType: uploadData.type
            }
          }
        })
        .then(() => {
          res.status(200).json({
            message: "It worked!"
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        });
    });
    busboy.end(req.rawBody);
  });
});

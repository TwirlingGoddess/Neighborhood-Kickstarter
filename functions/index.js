const functions = require('firebase-functions');
const { Storage } = require('@google-cloud/storage');
const os = require('os');
const path = require('path');
const gcs = new Storage()


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.onFileUpload = functions.storage.object().onFinalize(event => {
  console.log(event)
 const bucket = event.bucket
 const type = event.contentType
 const filePath = event.name
 console.log(bucket, type, filePath, 'File change detected, function execution initialized')

 if(path.basename(filePath).startsWith('renamed-')){
  console.log('We have already renamed this file!')
  return
 }

 const imageBucket = gcs.bucket(bucket);
 const tempFilePath = path.join(os.tmpdir(), path.basename(filePath))
 const metadata = { contentType: type }
 return imageBucket.file(filePath).download({
  destination: tempFilePath
 }).then(() => {
  return imageBucket.upload(tempFilePath, {
    destination: 'renamed-' + path.basename(filePath),
    metadata: metadata
  });

 });
});

exports.onFileDelete = functions.storage.object().onDelete(event => {
 console.log(event)
 return;
});

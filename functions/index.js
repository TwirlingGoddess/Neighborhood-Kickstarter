const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage')();
const os = require('os');
const path = require('path');


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.onFileUpload = functions.storage.object().onFinalize(event => {
 const object = event.data
 const bucket = object.bucket
 const type = object.contentType
 const filePath = object.name
 console.log(object, bucket, type, filePath)

 const imageBucket = gcs.bucket(bucket);
 const tempFilePath = 
 return;
});

exports.onFileUpload = functions.storage.object().onDelete(event => {
 console.log(event)
 return;
});

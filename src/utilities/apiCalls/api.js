var fs = require('fs');
var S3FS = require('s3fs');
var s3fsImpl = new S3FS('leeleestestbucket1', {
  accessKeyId: 'AKIAIXU4Q4Y4XZWUK4SQ', 
  secretAccessKey: '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'
});

s3fsImpl.create();

var multiparty = require('connect-multiparty'),
  multipartyMiddleware = multiparty();

module.exports = function(router, passport){
  router.use(multipartyMiddleware);

  router.use(passport.authenticate('bearer', { session: false}));
  router.use(function(req, res, next){
    fs.appendFile('log.txt' req.path + " token: " + req.query.access_token + " ")
      function(err){
        next();
      });
  });

  router.post('/testupload', function(req, res){
    var file = req.files.file;
    var stream = fs.createReadStream(file.path);
    return s3fsImpl.writeFile(file.originalFilename, stream).then(function(){
      fs.unlink(file.path, function(err){
        if(err){
          console.error(err)
        }
      })
      res.redirect('/profile');
    })
  })

  router.get('/testAPI', function(req, res){
    res.json({ SecretData: 'abc123' });
  });


}
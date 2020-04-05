// routes/index.js and users.js
import express from 'express';
import intakeFunctions from '../functions/fileIntake.js';

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({"Key": "This is a test"} );
});

/* PUT file upload */
router.put('/upload', function(req, res, next) {
  res.send(intakeFunctions.loadFile(req.body.data.lineJson));
});


export default router;

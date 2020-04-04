// routes/index.js and users.js
import express from 'express';
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({"Key": "This is a test"} );
});

export default router;

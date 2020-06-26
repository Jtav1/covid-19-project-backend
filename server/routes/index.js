// routes/index.js and users.js
import express from 'express';
import regeneratorRuntime from "regenerator-runtime";
import intakeFunctions from '../functions/fileIntake.js';
import dataFunctions from "../functions/getData.js";

var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send({"Key": "This is a test"} );
});

/* PUT file upload */
router.put('/api/upload', (req, res, next) => {
  res.send(intakeFunctions.loadFile(req.body.data.lineJson));
});

/* PUT US file upload */
router.put('/api/uploadUS', (req, res, next) => {
  res.send(intakeFunctions.loadUSFile(req.body.data.lineJson));
});


/* GET home page. */
router.get('/api/countryList', async (req, res, next) => {

  let result = await dataFunctions.countryList();
  res.status(200).send(result);
});



export default router;

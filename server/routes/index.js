// routes/index.js and users.js
import express from 'express';
import intakeFunctions from '../functions/fileIntake.js';
import dataFunctions from "../functions/getData.js";
import regeneratorRuntime from "regenerator-runtime";


var router = express.Router();

/* GET home page. */
router.get('/api', (req, res, next) => {
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

/* GET US-state specific deltas*/
router.get('/api/deltas/:state', async (req, res, next) => {
  let state = req.params.state;
  res.send(await dataFunctions.getDeltas(state));
});

/* GET US-state specific dates */
router.get('/api/dates/:state', async (req, res, next) => {
  let state = req.params.state;
  res.send(await dataFunctions.getDates(state));
});

/* GET US-state specific data*/
router.get('/api/data/:state', async (req, res, next) => {
  let state = req.params.state;
  res.send(await dataFunctions.getData(state));
});

/* GET country list */
router.get('/api/countryList', async (req, res, next) => {
  let result = await dataFunctions.countryList();
  res.status(200).send(result);
});

/* GET state list */
router.get('/api/stateList', async (req, res, next) => {
  let result = await dataFunctions.stateList();
  res.status(200).send(result);
});

export default router;

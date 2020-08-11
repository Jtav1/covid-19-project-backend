import mysql from 'mysql';
import util from 'util';

import regeneratorRuntime from "regenerator-runtime";

const makeDb = ( config ) => {
    const connection = mysql.createConnection( config );
    return {
      query( sql, args ) {
        return util.promisify( connection.query )
          .call( connection, sql, args );
      },
      close() {
        return util.promisify( connection.end ).call( connection );
      }
    };
  }

const getConnection = () => {
    const db = makeDb( {
        host     : process.env.DATABASE_HOST,
        user     : process.env.DATABASE_USER,
        password : process.env.DATABASE_PASSWORD,
        database : process.env.DATABASE_NAME
    } );

    return db;
}

const countryList = async () => {
    
    let db = getConnection();

    let sql = "SELECT DISTINCT COUNTRY FROM Data order by COUNTRY asc";
    let responseObject = {countries: []};

    let qry = await db.query(sql);
    db.close();

    qry.forEach((rowDataPacket) => {
        responseObject.countries.push(rowDataPacket.COUNTRY);
    });
    
       
    return responseObject;
}

const stateList = async () => {
    
  let db = getConnection();

  let sql = "SELECT DISTINCT PROVINCE_STATE, FIPS FROM Data_US where FIPS < 800 order by PROVINCE_STATE asc";
  let responseObject = [];

  let qry = await db.query(sql);
  db.close();

  qry.forEach((rowDataPacket) => {
      responseObject.push({id: rowDataPacket.FIPS, state: rowDataPacket.PROVINCE_STATE});
  });


     
  return responseObject;
}

const getDates = async (state) => {

  let db = getConnection();

  let sql = "select distinct date from Data_US where Province_State = ? order by date asc";
  let responseObject = {dates: []};

  let test = await db.query(sql, [state]);
  db.close();

  test.forEach((rowDataPacket) => {
      rowDataPacket.date = new Date(rowDataPacket.date);
      responseObject.dates.push((rowDataPacket.date.getMonth() + 1) + "-" + rowDataPacket.date.getDate() + "-" + rowDataPacket.date.getFullYear());

  });


     
  return JSON.stringify(responseObject.dates);
}

const getData = async (state) => {

  let db = getConnection();

  let sql = "select distinct date, confirmed from Data_US where Province_State = ? order by date asc;";
  let responseObject = {confirmed: []};

  let qry = await db.query(sql, [state]);
  db.close();

  qry.forEach((rowDataPacket) => {
    responseObject.confirmed.push(rowDataPacket.confirmed);
  });


     
  return JSON.stringify(responseObject.confirmed);
}

const getDeltas = async (state) => {

  let db = getConnection();

  let sql = "select distinct date, active from Data_US where Province_State = ? order by date asc;";
  let responseObject = {active: []};

  let qry = await db.query(sql, [state]);
  db.close();

  for(var i = 0; i < qry.length-1; i++){
    let delta = (qry[i+1].active - qry[i].active);
    if(delta > -500 && delta < 100000) responseObject.active.push(delta); //Rule out data outliers/bugs
  }

  responseObject.active.push(0);
     
  return JSON.stringify(responseObject.active);
}

export default {
    countryList,
    stateList,
    getDates,
    getData,
    getDeltas
}
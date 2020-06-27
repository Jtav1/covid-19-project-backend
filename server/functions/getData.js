import mysql from 'mysql';
import util from 'util';

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

    let test = await db.query(sql);

    test.forEach((rowDataPacket) => {
        responseObject.countries.push(rowDataPacket.COUNTRY);
    });
       
    return responseObject;
}

const getMdDates = async () => {

  let db = getConnection();

  let sql = "select distinct date from Data_US where Province_State = \'Maryland\' order by date asc";
  let responseObject = {dates: []};

  let test = await db.query(sql);

  test.forEach((rowDataPacket) => {
      rowDataPacket.date = new Date(rowDataPacket.date);
      responseObject.dates.push((rowDataPacket.date.getMonth() + 1) + "-" + rowDataPacket.date.getDate() + "-" + rowDataPacket.date.getFullYear());

  });
     
  return JSON.stringify(responseObject.dates);
}

const getMdData = async () => {

  let db = getConnection();

  let sql = "select distinct date, active from Data_US where Province_State = \'Maryland\' order by date asc;";
  let responseObject = {active: []};

  let test = await db.query(sql);

  test.forEach((rowDataPacket) => {
    responseObject.active.push(rowDataPacket.active);
  });
     
  return JSON.stringify(responseObject.active);
}

const getMdDeltas = async () => {

  let db = getConnection();

  let sql = "select distinct date, active from Data_US where Province_State = \'Maryland\' order by date asc;";
  let responseObject = {active: []};

  let test = await db.query(sql);

  for(var i = 0; i < test.length-1; i++){
    responseObject.active.push((test[i+1].active - test[i].active));
  }
  
  responseObject.active.push(0);
     
  return JSON.stringify(responseObject.active);
}

export default {
    countryList,
    getMdDates,
    getMdData,
    getMdDeltas
}
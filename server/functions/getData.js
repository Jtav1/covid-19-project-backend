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

export default {
    countryList
}
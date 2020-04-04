import mysql from 'mysql';

const createConnection = () => {

    let connection = mysql.createConnection({
        host     : process.env.DATABASE_HOST,
        user     : process.env.DATABASE_USER,
        password : process.env.DATABASE_PASSWORD,
        database : process.env.DATABASE_NAME
    });

    connection.connect();

    return connection;
}

const cleanupConnection = (connection) => {
    connection.end();
}




const loadFile = (fileJson) => {
    console.log(fileJson.lines);
    
    let connection = createConnection();

    connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);
      });

    cleanupConnection(connection);
}

export default {
    loadFile
}
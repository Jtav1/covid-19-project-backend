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

const loadFile = (fileJson) => {
    let conn = createConnection();

    console.log(fileJson);

    let sql = "INSERT INTO Data (Date,state,country,updated,confirmed,deaths,recovered) VALUES ?";
    let values = [];

    fileJson.lines.map((line) => {
        if(line.country) {
            values.push(
            [
                new Date(fileJson.date),
                line.state, 
                line.country, 
                new Date(line.update), 
                line.confirmed ? line.confirmed : 0, 
                line.deaths ? line.deaths : 0, 
                line.recovered ? line.recovered : 0
            ]
        );
        }
       
    });

    conn.query(sql, [values], (err) => {
        if (err) throw err;
        conn.end();
    });

}

export default {
    loadFile
}
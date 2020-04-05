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

    let sql = "INSERT INTO Data (Date,state,country,updated,confirmed,deaths,recovered,fips,city,lat,longitude) VALUES ?";
    let values = [];

    fileJson.lines.map((line) => {
        if(line.country) {
            values.push(
            [
                fileJson.date ? new Date(fileJson.date) : null,
                line.state ? line.state : "", 
                line.country ? line.country : "", 
                line.updated ? new Date(line.updated) : null, 
                line.confirmed ? line.confirmed : 0, 
                line.deaths ? line.deaths : 0, 
                line.recovered ? line.recovered : 0,
                line.fips ? line.fips : "",
                line.city? line.city : "",
                line.lat ? line.lat : "",
                line.longitude ? line.longitude : ""
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
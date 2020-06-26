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

const loadUSFile = (fileJson) => {
    let conn = createConnection();

    let sql = "INSERT INTO Data_US (Active,Confirmed,Country_Region,date,Deaths,FIPS,Hospitalization_Rate,Incident_Rate,ISO3,Last_Update,Lat,Longitude,Mortality_Rate,People_Hospitalized,People_Tested,Province_State,Recovered,Testing_Rate,UID) VALUES ?";
    let values = [];

    fileJson.lines.map((line) => {
        values.push(
            [
                line.active ? line.active : null,
                line.confirmed ? line.confirmed :  null,
                line.country_region ? line.country_region :  null,
                fileJson.date ? new Date(fileJson.date) : null,
                line.deaths ? line.deaths :  null,
                line.fips ? line.fips :  null,
                line.hospitalization_rate ? line.hospitalization_rate :  null,
                line.incident_rate ? line.incident_rate :  null,
                line.iso3 ? line.iso3 :  null,
                line.last_update ? new Date(line.last_update) : null,
                line.lat ? line.lat :  null,
                line.longitude ? line.longitude :  null,
                line.mortality_rate ? line.mortality_rate :  null,
                line.people_hospitalized ? line.people_hospitalized :  null,
                line.people_tested ? line.people_tested :  null,
                line.province_state ? line.province_state :  null,
                line.recovered ? line.recovered : null,
                line.testing_rate ? line.testing_rate :  null,
                line.uid ? line.uid : null,
            ]
        );
    });

    console.log(sql);
    conn.query(sql, [values], (err) => {
        
        if (err) throw err;
        conn.end();
    });

}

export default {
    loadFile,
    loadUSFile
}
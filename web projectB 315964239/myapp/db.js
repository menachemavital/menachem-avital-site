const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'sql.freedb.tech',
    port: '3306',
    user: 'freedb_avimen',
    password: 'N%?2Zy9y6e$y*rG',
    database: 'freedb_the comunity library'
});

connection.connect(error =>{
    if (error) throw error;
    console.log("succefuly connected to DB");
});

module.exports = connection;
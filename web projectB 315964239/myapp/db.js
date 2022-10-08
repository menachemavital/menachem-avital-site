const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '089210820',
    database: 'weblibrary'
});

connection.connect(error =>{
    if (error) throw error;
    console.log("succefuly connected to DB");
});

module.exports = connection;
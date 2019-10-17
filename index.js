const mysql = require('mysql');
var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'employeedb',
    multipleStatements:true
})

mysqlConnection.connect((err)=>
{
    if(!err)
    {
        console.log('Db connection established');
    }
    else{
        console.log('Db connection refused : '+ JSON.stringify(err)); 
    }
})

module.exports = {
mysql, mysqlConnection
}
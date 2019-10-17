const {mysqlConnection} = require('/home/shravya/Desktop/folder/index.js')
// var mysqlConnection = mysqlConn
const express = require('express');
// const connect = require('/home/shravya/Desktop/folder/index.js');
// var app= connect;
var app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.listen(3000, () => console.log('express server is ready at port no 3000'));

//get all employees
app.get('/employees', (req, res) => {
    
    mysqlConnection.query('Select * from employee', (err, rows, fields) => {
        if (!err)
            res.send(rows);
            //log(rows[0].EmpId)
        else
            console.log(err);

    })
})

//get an employee
app.get('/employee/:id', (req, res) => {
    
    mysqlConnection.query('Select * from employee where EmpId = ?',[req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
            //log(rows[0].EmpId)
        else
            console.log(err);

    })
})

//delete an employee
app.delete('/deleteemployee/:id', (req, res) => {
    
    mysqlConnection.query('delete from employee where EmpId = ?',[req.params.id], (err, rows, fields) => {
        if (!err)
            // res.send(rows);
            //log(rows[0].EmpId)
            console.log('deleted successfully')
        else
            console.log(err);

    })
})

//insert employee

app.post('/employees', (req, res) => {
    var emp=req.body;
    var sql = "set @EmpId = ?;set @Name = ?;set @EmpCode = ?;set @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpId,@Name,@EmpCode,@Salary);";
    mysqlConnection.query(sql,[emp.EmpId,emp.Name,emp.EmpCode,emp.Salary], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                {
                    res.send('inserted : '+element[0].EmpId)
                }
            });
            // (element =>{
            //     if(element.constructor == Array)
            //     {
            //         res.send('inserted : '+element(0).EmpId);
            //     }
            // });
            //log(rows[0].EmpId)
        else
            console.log(err);

    })
})
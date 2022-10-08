const sql = require('./db');
var path= require('path');

const InsertUser = (req,res)=>{
    
    if (!req.body) {
        res.status(400).send({
            message: "content cannot be empty"
        });
        return;
    }
    if(req.body.password1 !=req.body.password2){
        res.status(400).send({
            message: "password must match"
        });
        return; 
    }
    
    const NewUserEntry = {
    'email': req.body.email,
    'userName' : req.body.userName,
    'password': req.body.password1,
    'phoneNumber': req.body.phoneNumber,
    'city':req.body.gender,
    'gender':req.body.gender,
    'photo': 'http://localhost:2000/images/profilePics/' +'picture'+'-'+ req.body.email +path.extname(req.file.filename)
    };
    console.log(NewUserEntry);
    const Q1 = "INSERT INTO Users SET ?";
    sql.query(Q1, NewUserEntry, (err, mysqlres)=>{
        if (err) {
            res.status(400).send({message: "error om creating customer " + err});
            console.log("error om creating customer " + err);
            return;            
        }
        console.log("created new student succesfully "+ mysqlres);

        return;
    })
   
    
};



module.exports = {InsertUser}
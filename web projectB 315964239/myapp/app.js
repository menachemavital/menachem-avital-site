// import + declare what ever you need
const express = require('express');
const BodyParser = require('body-parser');
const path = require('path');
const port = 2000;
const sql = require('./db');
const CRUD = require('./CRUD'); 
const { Server } = require('http');


// setups
const app = express();
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('static'));


const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './static/images/profilePics')     
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-'+req.body.email + path.extname(file.originalname))
    }
})
 
const upload = multer({ storage: storage});



//routs
app.get('/', (req, res)=>{
    res.render('login');
    
});


app.post('/users/add' ,upload.single("picture"),CRUD.InsertUser ) ;



app.get('/signUp.html',(req,res)=>{
    res.render("signUp");
})


// listen
app.listen(port, ()=>{
    console.log("server is running on port " + port);
});
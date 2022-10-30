// import + declare what ever you need
const express = require('express');
const BodyParser = require('body-parser');
const path = require('path');
const port =5000;
const sql = require('./db');
const CRUD = require('./CRUD'); 
const { Server } = require('http');

const multer = require('multer');
const { render } = require('pug');
const app = express();

// setups

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('static'));


//session setup 
const session = require('express-session');
const store = new session.MemoryStore();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: false,
    store
}));

//image storage(A is for profile photos and B for book covers)

var storageA = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './static/images/profilePics')     
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-'+req.body.email + path.extname(file.originalname))
    }
})

var storageB = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './static/images/book covers')     
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-'+req.body.book_name + path.extname(file.originalname))
    }
})
 
const uploadProfilePic = multer({ storage: storageA});
const uploadBookCover = multer({ storage: storageB});


//routs

    //simple gets
app.get('/LogIn.html', (req, res)=>{
    res.render('LogIn');   
});

app.get('/signUp.html',(req,res)=>{
    res.render("signUp");
})  

app.get('/logIn', (req,res)=>{
    res.render('logIn')
})
 
app.get('/addBook', (req,res)=>{
    if(req.session.loggedin){

        res.render('addBook')
    }
    else res.redirect('/logIn')
})

app.get('/logOut', (req,res)=>{
    req.session.destroy()
    res.redirect('/logIn')
})
    //more complex handlers, see discription in CRUD

app.get('/', CRUD.getHomePage)

app.get('/searchResult', CRUD.getSearchResults)
 
app.get('/profilePage', CRUD.getProfilePage)
 
app.post('/addBook', uploadBookCover.single("cover"), CRUD.InsertBook);
  
app.post('/logIn', CRUD.logIn)

app.get('/bookPage', CRUD.getBookPage )  
      
app.post('/bookPage', CRUD.InsertBookRequest)

app.post('/users/add' ,uploadProfilePic.single("picture"),CRUD.InsertUser ) ;

app.post('/bookPage/loan/add',CRUD.addLoan)
   
app.post('/bookPage/bookRequests/refuse', CRUD.refuseRequest)

app.post('/bookPage/bookRequests/cancle',CRUD.cancleRequest)

app.post('/bookPage/loan/finish',CRUD.endLoan)



// listen
app.listen(port, ()=>{
    console.log("server is running on port " + port);
});  
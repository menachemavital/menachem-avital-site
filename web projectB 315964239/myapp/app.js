// import + declare what ever you need
const express = require('express');
const BodyParser = require('body-parser');
const path = require('path');
const port = 3000;
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

//image storage

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
app.get('/LogIn.html', (req, res)=>{
    res.render('LogIn');   
});

app.get('/signUp.html',(req,res)=>{
    res.render("signUp");
})  
app.get('/searchResult', (req,res)=>{
    if(req.query){
        console.log(req.query.query);
        
    sql.query('SELECT * FROM weblibrary.books WHERE book_name like ? OR author like ?',[req.query.query,req.query.query] , function(error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        if (results.length > 0) {
            // Authenticate the user
            console.log(results);
            res.render('serchResult',
            {results : results,
            old_query: req.query.query })
         
        
        } else {
            res.send('לא נמצאו תוצאות ');
           
        }			
        
    }); }
    else{
        res.redirect('/');
    }
})
  

app.get('/', CRUD.getHomePage)
 
app.get('/profilePage', CRUD.getProfilePage)

app.get('/addBook', (req,res)=>{
    if(req.session.loggedin){

        res.render('addBook')
    }
    else res.redirect('/logIn')
})   
 
app.post('/addBook', uploadBookCover.single("cover"), CRUD.InsertBook);
  
app.post('/logIn', CRUD.logIn)
app.get('/logIn', (req,res)=>{
    res.render('logIn')
})
app.get('/bookPage', CRUD.getBookPage )  
      
app.post('/bookPage', CRUD.InsertBookRequest)

app.post('/users/add' ,uploadProfilePic.single("picture"),CRUD.InsertUser ) ;

app.get('/logOut', (req,res)=>{
    req.session.destroy()
    res.redirect('/logIn')
})

app.post('/bookPage/loan/add',(req,res)=>{
    a = JSON.parse(req.body.book)
     
    console.log(a)
    //checking if the book is not double orderd
    sql.query('select status from weblibrary.books WHERE book_name = ? and owner_email = ?',[a.book_name,a.owner_email] , 
    function(error, result, fields) {
        
        // If there is an issue with the query, output the error
        if (error) throw error;   
          
        if(parseInt(result[0].status)==0){
            
            res.send('<script> alert("אין אפשרות להשאיל את הספר פעמיים, יש לסגור את ההשאלה הקודמת כדי להשאיל שוב"); window.location.href = "/profilePage"; </script>') 
        
         }

        else{
                    //update the DB that the book is no longeer avialble
            sql.query('update weblibrary.books set status = 0 WHERE book_name = ? and owner_email = ?',[a.book_name,a.owner_email] , 
            function(error, results, fields) {
                // If there is an issue with the query, output the error
                if (error) throw error;       
            })

            //update the DB that the book is no longeer avialble
            sql.query('update weblibrary.book_requests set status = "מאושר" WHERE book_name = ? and owner_email = ? ',[a.book_name,a.owner_email] , 
            function(error, results, fields) {
                // If there is an issue with the query, output the error
                if (error) throw error;        
            })
        
            var d =  new Date().toLocaleDateString()
            //create a new loan in the DB
            sql.query('insert into loans values (?,?,?,?,?); ',[a.user_asking ,a.book_name, req.session.email, d, null]
            , 
            function(error, results, fields) {
                // If there is an issue with the query, output the error
                if (error) throw error;       
            })

            
            res.redirect('/profilePage')
        }
    })
})

    
app.post('/bookPage/bookRequests/refuse', (req,res)=>{
    a = JSON.parse(req.body.book)
    sql.query('update weblibrary.book_requests set status = "מסורב" WHERE book_name = ? and owner_email = ? ',[a.book_name,a.owner_email] , 
    function(error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;        
    })
    res.redirect('/profilePage')
})

app.post('/bookPage/bookRequests/cancle',(req,res)=>{
    m = JSON.parse(req.body.myReq)
    sql.query('update weblibrary.book_requests set status = "מבוטל" WHERE book_name = ? and user_asking = ? ',[m.book_name,m.user_asking] , 
    function(error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;        
    })  
    res.redirect('/profilePage')
})
app.post('/bookPage/loan/finish',(req,res)=>{
   var d  = new Date().toISOString().slice(0, 10);
   var f = JSON.parse(req.body.finish);
    sql.query('update weblibrary.books set status = 1 WHERE book_name = ? and owner_email = ? ',[f.book_name,req.session.email,] , 
    function(error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;        
    })
    console.log(f.start_date)
    sql.query('update weblibrary.loans set end_date = ? WHERE book_name = ?  and owner_email = ? and lowner_email = ?',[d,f.book_name,req.session.email, f.lowner_email] , 
    function(error, results, fields) {
        // If there is an issue with the query, output te error
        if (error) throw error;        
    })  
    res.redirect('/profilePage')
})
// listen
app.listen(port, ()=>{
    console.log("server is running on port " + port);
});  
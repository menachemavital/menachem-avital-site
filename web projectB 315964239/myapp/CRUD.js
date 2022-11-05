const sql = require('./db');
var path= require('path');
const { parse } = require('path');


const InsertUser = (req,res)=>{
// this handeler is to add a new user to the DB, we allow with or without profile pic    
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
    var NewUserEntry = {};
    if(!req.file){
        NewUserEntry = {
            'email': req.body.email,
            'userName' : req.body.userName,
            'password': req.body.password1,
            'phoneNumber': req.body.phoneNumber,
            'city':req.body.city,
            'gender':req.body.gender,    
            'photo': null
            };
    }
    else{
        
        NewUserEntry = {
                'email': req.body.email,
                'userName' : req.body.userName,
                'password': req.body.password1,
                'phoneNumber': req.body.phoneNumber,
                'city':req.body.city,
                'gender':req.body.gender,    
                'photo': 'http://localhost:2000/images/profilePics/' +'picture'+'-'+ req.body.email + path.extname(req.file.filename)
            }; 
    }  
      
    
    const Q1 = "INSERT INTO Users SET ?";
    sql.query(Q1, NewUserEntry, (err, mysqlres)=>{
        if (err) {
            res.status(400).send({message: "error om creating customer " + err});
            console.log("error om creating customer " + err);
            return;            
        }
        return;
    })
   res.redirect('/');
    
};
 
const logIn = (req,res)=>{
    // in this handler we verify our user details and create a session that will identify the user for us,
    // as long as he is conected
    let email = req.body.email;
    let password = req.body.password;
    if(email && password){
       // Execute SQL query that'll select the account from the database based on the specified username and password
		sql.query('SELECT * FROM users WHERE email = ? AND password = ?', 
        [email, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
                
                req.session.username = results[0].userName;
				req.session.loggedin = true;
				req.session.email = email;
               
				// Redirect to home page
				res.redirect('/');
			} else {
				res.render('logIn', {message:'שם משתמש או סיסמא אינם נכונים*',
            userEmail:req.body.email});
			}			
			res.end();
		}); 
    }
    else{
        res.send('Please enter Username and Password!');
		res.end(); 
    }
}    

const getSearchResults = (req,res)=>{
    // here we are checking for results by book name and author, then use the data to render a page
    if(req.query){
        console.log(req.query.query);
        
    sql.query('SELECT * FROM books WHERE book_name like ? OR author like ?',[req.query.query,req.query.query] , function(error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        if (results.length > 0) {
            // Authenticate the user
            console.log(results);
            res.render('serchResult',
            {results : results,
            message: 'אלה התוצאות שמצאנו עבור: '+req.query.query })
         
        
        } else {
            res.render('serchResult',
            {results : results,
                message: 'לא נמצאו תוצאות' });
           
        }			
        
    }); }
    else{
        res.redirect('/');
    }
}
     
const getHomePage =  (req,res)=>{
    //here we want to render to the user our 20 latests books published
    sql.query('SELECT * FROM books join users on books.owner_email = users.email order by publish_date  limit 20' , function(error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        var message;
        if(req.session.loggedin){
            message='התנתק'
        }
        else{
            message = 'התחבר'
        }
            
            
            console.log(req.session);
            res.render('homePage',
            {results : results,
            session : req.session,
            message: message})
                 
                			
        res.end();
    });    
}
const getProfilePage = (req,res)=>{
    // in the profile page we want the user to view his: 
    //personal details, request he sent, requests sent to him, and active loans history
    if(req.session.loggedin){
        sql.query('SELECT * FROM users left join loans on users.email = loans.lowner_email or users.email = loans.owner_email WHERE email = ? ', 
        [req.session.email], function(error, resultsA, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			
			if (resultsA.length > 0) {            
				sql.query('SELECT * FROM book_requests join users on users.email = book_requests.user_asking  WHERE owner_email = ? and status = "ממתין"  ', [req.session.email], function(error, resultsB, fields) {
                    // If there is an issue with the query, output the error
                    if (error) throw error;
 
                    sql.query('SELECT * FROM book_requests join users on users.email = book_requests.owner_email  WHERE user_asking = ? and status !="מבוטל" ', [req.session.email], function(error, resultsC, fields) {
                        // If there is an issue with the query, output the error
                        if (error) throw error;
                        resultsA.forEach(r => {
                            r.start_date = r.start_date.toLocaleDateString().slice(0,10)
                            if(r.end_date){
                                r.end_date = r.end_date.toLocaleDateString().slice(0,10)
                            }
                           
                        })
                        resultsB.forEach(r => {
                            r.time = r.time.toLocaleDateString().slice(0,10)
                            
                        })
                        resultsC.forEach(r => {
                            r.time = r.time.toLocaleDateString().slice(0,10)
                        })
                        res.render('profilePage',
                        {user: resultsA,
                        ask: resultsB,
                        myRequests:resultsC});
                                       
                    })         
                });
			}
		});
    }
    else{
        res.redirect('/logIn.html')
    }
}

const InsertBook = (req,res)=>{
    //inserting a new book to the DB
    if (!req.body) {
        res.status(400).send({
            message: "content cannot be empty"
        });
        return;
    }
    
    
    if(req.file){
        NewUserEntry = {
            'book_name': req.body.book_name,
            'owner_email' : req.session.email,
            'author': req.body.author,
            'status': 1,
            'discription':req.body.discription,
            'cover_url':'/images/book covers/'+'cover-' + req.body.book_name + path.extname(req.file.filename),
            'publish_date': new Date().toLocaleDateString()
        }
    }
    else{

        console.log("there is'nt a file")
        NewUserEntry = {
            
            'book_name': req.body.book_name,
            'owner_email' : req.session.email,
            'author': req.body.author,
            'status': 1,
            'discription':req.body.discription,
            'cover_url':null,
            'publish_date': new Date().toLocaleDateString()
            
            };
        
           
    } 
      
    
    const Q1 = "INSERT INTO books SET ?";
    sql.query(Q1, NewUserEntry, (err, mysqlres)=>{
        
        if (err) {
            res.status(400).send({message: "error om creating book " + err});
            console.log("error om creating book " + err);
            return;            
        }
        res.redirect('/');
        
        return;

    })
    
   
    
};

const getBookPage = (req,res)=>{
    //render a book page from the book details in the DB
    sql.query('SELECT * FROM books join users on books.owner_email = users.email WHERE owner_email = ? AND book_name = ?', [req.query.owner_email, req.query.book_name],
     function(error, bookDetails, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // if there is that book
        if (bookDetails.length > 0) {
            console.log(bookDetails[0])
            res.render('bookPage',
            {bookDetails: bookDetails[0]})
        }
             
        res.end();
    }); 
    

}

const addLoan = (req,res)=>{
    // adding a new loan to the DB
    a = JSON.parse(req.body.book)
     
    console.log(a)
    //checking if the book is not double orderd
    sql.query('select status from books WHERE book_name = ? and owner_email = ?',[a.book_name,a.owner_email] , 
    function(error, result, fields) {
        
        // If there is an issue with the query, output the error
        if (error) throw error;   
          
        if(parseInt(result[0].status)==0){
            
            res.send('<script> alert("אין אפשרות להשאיל את הספר פעמיים, יש לסגור את ההשאלה הקודמת כדי להשאיל שוב"); window.location.href = "/profilePage"; </script>') 
        
         }

        else{
                    //update the DB that the book is no longeer avialble
            sql.query('update books set status = 0 WHERE book_name = ? and owner_email = ?',[a.book_name,a.owner_email] , 
            function(error, results, fields) {
                // If there is an issue with the query, output the error
                if (error) throw error;       
            })

            //update the DB that the book is no longeer avialble
            sql.query('update book_requests set status = "מאושר" WHERE book_name = ? and owner_email = ? ',[a.book_name,a.owner_email] , 
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
}

const InsertBookRequest = (req,res)=>{
    // adding a request that will enter the DB and the lowner could see and aprove/refuse
    
    if (!req.body) {
        res.status(400).send({
            message: "content cannot be empty"
        });
        return;
    }
    
    var NewUserEntry1 = {
            'user_asking': req.session.email,
            'book_name' : req.body.book_name,
            'owner_email': req.body.owner_email,
            'time': new Date()
            }; 
   
    
    const Q2 = "INSERT ignore INTO book_requests SET ?";
    sql.query(Q2, NewUserEntry1, (err, mysqlres)=>{
        
        if (err) {
            res.status(400).send({message: "error om creating customer " + err});
            console.log("error om creating customer " + err);
            return;            
        }
      
        return;
    })
    res.send('<script> alert("הבקשה נשלחה! נעביר את הפרטים שלך לבעל הספר והוא יצור איתך קשר"); window.location.href = "/"; </script>');
 
    
   
    
};

const refuseRequest = (req,res)=>{
    // loaner can refuse to a request 
    a = JSON.parse(req.body.book)
    sql.query('update book_requests set status = "מסורב" WHERE book_name = ? and owner_email = ? ',[a.book_name,a.owner_email] , 
    function(error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;        
    })
    res.redirect('/profilePage')
}

const cancleRequest = (req,res)=>{
    //the user asking for a book can cancle a request if no longer relevant
    m = JSON.parse(req.body.myReq)
    sql.query('update book_requests set status = "מבוטל" WHERE book_name = ? and user_asking = ? ',[m.book_name,m.user_asking] , 
    function(error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;        
    })  
    res.redirect('/profilePage')
}

const endLoan =(req,res)=>{
    // when the book is returned to the owner, he cn then end the loan so the book will be avialable again
    var d  = new Date().toISOString().slice(0, 10);
    var f = JSON.parse(req.body.finish);
     sql.query('update books set status = 1 WHERE book_name = ? and owner_email = ? ',[f.book_name,req.session.email,] , 
     function(error, results, fields) {
         // If there is an issue with the query, output the error
         if (error) throw error;        
     })
     console.log(f.start_date)
     sql.query('update loans set end_date = ? WHERE book_name = ?  and owner_email = ? and lowner_email = ?',[d,f.book_name,req.session.email, f.lowner_email] , 
     function(error, results, fields) {
         // If there is an issue with the query, output te error
         if (error) throw error;        
     })  
     res.redirect('/profilePage')
 }


module.exports = {InsertUser,logIn, getHomePage,getProfilePage, InsertBook, getBookPage, InsertBookRequest, getSearchResults,addLoan,refuseRequest,cancleRequest,endLoan}

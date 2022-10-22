const sql = require('./db');

var path= require('path');
const { parse } = require('path');

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
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		}); 
    }
    else{
        res.send('Please enter Username and Password!');
		res.end(); 
    }
}                                                                                   
     
const getHomePage =  (req,res)=>{
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


const InsertBookRequest = (req,res)=>{
    
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



module.exports = {InsertUser,logIn, getHomePage,getProfilePage, InsertBook, getBookPage, InsertBookRequest}
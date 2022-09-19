// JavaScript source code


let books = new Array();

function Book(bookName, author, ownerEmail, coverURL, status, discription) {
    this.bookName = bookName;
    this.author = author;
    this.ownerEmail = ownerEmail;
    this.coverURL = coverURL;
    this.status = status;
    this.discription = discription;
    books.push(this);
}


function openBookPage() {
    window.location = "bookPage.html";

}






new Book("html 4", "זוהר עמיהוד", "avimen@post.bgu.ac.il", "../static/images/book covers/html4.jpeg", "זמין", "לא קראתי");
new Book("ענבי זעם", "ג'ון סטיינבק", "avimen@post.bgu.ac.il", "../static/images/book covers/rage grapes.jpeg", 'מושאל', "אחלה ספר");
new Book("קדמת עדן", "ג'ון סטיינבק", "avimen@post.bgu.ac.il", "../static/images/book covers/east of eden.jpeg", "זמין", "אחלה ספר");
new Book("של עכברים ואנשים", "ג'ון סטיינבק", "avimen@post.bgu.ac.il", "../static/images/book covers/of mice and people.jpeg", "זמין", "אחלה ספר");
new Book("סוס אחד נכנס לבר", "דויד גרוסמן", "avimen@post.bgu.ac.il", "../static/images/book covers/a horse walks into a bar.jpeg", "זמין", "אחלה ספר");
new Book("הארי פוטר ומסדר עוף החול", "ג'יי קיי רולינג", "avimen@post.bgu.ac.il", "../static/images/book covers/harry poter 4.jpeg", "זמין", "בהחלט בהחלט");
new Book("בשורות טובות", "טרי פראצ'ט, ניל גיימן", "avimen@post.bgu.ac.il", "../static/images/book covers/good news.jpeg", "זמין", "משעשע מאוד");
new Book("תקלה בקצה הגלקסיה", "אתגר קרת", "avimen@post.bgu.ac.il", "../static/images/book covers/error at the edge of the galaxy.jpeg", "זמין", "אחלה ספר");
new Book("האחים קראמזוב", "פיודור מיכאלוביץ' דוסטוייבסקי", "avimen@post.bgu.ac.il", "../static/images/book covers/the karamazov brothers.jpeg", "זמין", "כבד רצח");
new Book("רציונליות, הוגנות, אושר", "דניאל כהנמן", "avimen@post.bgu.ac.il", "../static/images/book covers/rationality, fairness, happyness.jpeg", "זמין", "מעניין");
new Book("כה אמר זרתוסטרה", "פרידריך ניטשה", "avimen@post.bgu.ac.il", "../static/images/book covers/zaratustra.jpeg", "זמין", "ספר לכל אחד ולאף אחד");
new Book("להדליק מדורה", "ג'ק לונדון", "avimen@post.bgu.ac.il", "../static/images/book covers/to light a fire.jpeg", "זמין", "צאו לטייל באלסקה בחצי שעה של קריאה, קצר ומעולה.");


function firstBook(imgID, status, booktitleId) {

    x = books.shift();

    document.getElementById(imgID).src = x.coverURL;
    document.getElementById(status).innerHTML = x.status;
    document.getElementById(booktitleId).innerHTML = x.bookName;

    books.push(x);
}


function lastBook(imgID, status, booktitleId) {

    x = books.pop();

    console.log(x.coverURL);

    document.getElementById(imgID).src = x.coverURL;
    document.getElementById(status).innerHTML = x.status;
    document.getElementById(booktitleId).innerHTML = x.bookName;
    books.unshift(x);
}


function rightOrder() {

    firstBook('card1img', 'card1-status', 'card1-title');
    firstBook('card2img', 'card2-status', 'card2-title');
    firstBook('card3img', 'card3-status', 'card3-title');
    firstBook('card4img', 'card4-status', 'card4-title');
    firstBook('card5img', 'card5-status', 'card5-title');
}

function leftOrder() {

    lastBook('card1img', 'card1-status', 'card1-title');
    lastBook('card2img', 'card2-status', 'card2-title');
    lastBook('card3img', 'card3-status', 'card3-title');
    lastBook('card4img', 'card4-status', 'card4-title');
    lastBook('card5img', 'card5-status', 'card5-title');
}




// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];




// When the user clicks on the button, open the modal



// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// JavaScript source code


let books = new Array();


function Book(bookName , author, ownerEmail, coverURL, status, discription) { 
    this.bookName = bookName;
    this.author = author;
    this.wnerEmail = ownerEmail;
    this.coverURL = coverURL;
    this.status = status;
    this.discription = discription;
    books.push(this);
}



new Book("html 4", "���� ������", "avimen@post.bgu.ac.il", "../static/images/book covers/html4.jpeg", "����", "�� �����");
new Book("���� ���", "�'�� �������", "avimen@post.bgu.ac.il", "../static/images/book covers/rage grapes.jpeg","����", "���� ���");
new Book("���� ���", "�'�� �������", "avimen@post.bgu.ac.il", "../static/images/book covers/east of eden.jpeg", "����", "���� ���");
new Book("� ������ ������", "�'�� �������", "avimen@post.bgu.ac.il", "../static/images/book covers/of mice and people.jpeg", "����", "���� ���");
new Book("��� ��� ���� ���", "���� ������", "avimen@post.bgu.ac.il", "../static/images/book covers/a horse walks into a bar.jpeg", "����", "���� ���");
new Book("���� ���� ����� ��� ����", "�'�� ��� ������", "avimen@post.bgu.ac.il", "../static/images/book covers/harry poter 4.jpeg", "����", "����� �����");
new Book("������ �����", "��� ����'�, ��� �����", "avimen@post.bgu.ac.il", "../static/images/book covers/good news.jpeg", "����", "����� ����");
new Book("���� ���� �������", "���� ���", "avimen@post.bgu.ac.il", "../static/images/book covers/error at the edge of the galaxy.jpeg", "����", "���� ���");
new Book("����� �������", "������ ���������' �����������", "avimen@post.bgu.ac.il", "../static/images/book covers/the karamazov brothers.jpeg", "����", "��� ���");
new Book("���������, ������, ����", "����� �����", "avimen@post.bgu.ac.il", "../static/images/book covers/rationality, fairness, happyness.jpeg", "����", "������");
new Book("�� ��� ��������", "������� �����", "avimen@post.bgu.ac.il", "../static/images/book covers/zaratustra.jpeg", "����", "��� ��� ��� ���� ���");
new Book("������ �����", "�'� ������", "avimen@post.bgu.ac.il", "../static/images/book covers/to light a fire.jpeg", "����", "��� ����� ������ ���� ��� �� �����, ��� ������.");




function firstBook(imgID, status, booktitleId) {

    x = books.shift();

    console.log(x.coverURL);

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

    firstBook('card1img', 'card1-available', 'card1-title');
    firstBook('card2img', 'card2-available', 'card2-title');
    firstBook('card3img', 'card3-available', 'card3-title');
    firstBook('card4img', 'card4-available', 'card4-title');
}

function leftOrder() {

    lastBook('card1img', 'card1-available', 'card1-title');
    lastBook('card2img', 'card2-available', 'card2-title');
    lastBook('card3img', 'card3-available', 'card3-title');
    lastBook('card4img', 'card4-available', 'card4-title');
}


function showStatus(imgid, statusID) {
    document.getElementById(statusID).innerHTML
}



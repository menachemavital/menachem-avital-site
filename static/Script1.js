// JavaScript source code
let books = [
    { "bookName": "���� ���", "author": "�'�� �������", "ownerID": "1234", "ownerLocation": "��� ���", "imgURL": "images/book covers/east of eden.jpeg", "status": "����" },
    { "bookName": "��� ��� ���� ���", "author": "���� �������", "ownerID": "1234", "ownerLocation": "��� ���", "imgURL": "images/book covers/a horse walks into a bar.jpeg", "status": "�� ����" }
]

const p = document.createElement('<div class="card" id="card1"> < div class= "image-content" >div class="card-image"> <img src="../static/images/book covers/a horse walks into a bar.jpeg" class="card-img" id="card1img" /><span class="available"></span></div></div ><div class="card-content"><h4 class"book-title">book1.title</h4><p> location</p><div class="btn"><button class="highlight-button">����</button> <button>����� ������</button></div></div ></div > ');

function int_slider() {
    let book1 = JSON.parse(books[0]);
    let book2 = JSON.parse(books[2]);
    document.getElementById(card1).appendChild(p);
   
}
function changepic(x) {
    document.getElementById(x).src = 'a horse walks into a bar.jpeg';
}

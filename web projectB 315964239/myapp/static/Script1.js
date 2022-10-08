

// JavaScript source code
   



function openBookPage() {
    window.location = "bookPage.html";

}


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];




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

$('#myForm').on('submit', function (e) {
    $('#myModal').modal('show');
    e.preventDefault();
});


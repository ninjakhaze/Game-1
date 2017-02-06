// Get the button, and when the user clicks on it, execute myFunction
document.getElementById("myBtn").onclick = function() {myFunction()};

/* myFunction toggles between adding and removing the show class, which is used to hide and show the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
// Get the button, and when the user clicks on it, execute myFunction
document.getElementById("myBtn2").onclick = function() {myFunction2()};

/* myFunction toggles between adding and removing the show class, which is used to hide and show the dropdown content */
function myFunction2() {
    document.getElementById("myDropdown2").classList.toggle("show");
}
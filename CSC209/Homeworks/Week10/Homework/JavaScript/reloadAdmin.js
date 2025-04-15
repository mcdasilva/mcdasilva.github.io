function reloadDoc() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        document.getElementById("usersData").innerHTML = this.responseText;
    }
    xhttp.open("GET", "getUsers.php");
    xhttp.send();
}
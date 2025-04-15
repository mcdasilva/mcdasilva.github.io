function closeModal() {
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}


function checkLoginSuccess() {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Stop the page from reloading

        const xhttp = new XMLHttpRequest();

        // Step 1: Configure request
        xhttp.open("POST", "processLogin.php", true); // Send to your PHP script

        const formData = new FormData(form);
        xhttp.send(formData);

        // Step 2: Handle response when it arrives
        xhttp.onload = function() {
            const isSuccessful = xhttp.responseText.trim(); // Get result from PHP

            if (isSuccessful == 'true') {
                window.location.href = "userLogged.php";
            }
            else if (isSuccessful == 'admin') {
                window.location.href = "adminLogged.php";
            } 
            else {
                const logout = new XMLHttpRequest();
                logout.open("GET", "logout.php?goToLogin=false", true);
                logout.send();
                alert("Login failed. Please check your credentials.");
            }
        };

    });
}

function checkRememberMe() {

    const xhttp = new XMLHttpRequest();

    // Step 1: Configure request
    xhttp.open("POST", "checkSession.php", true); // Send to your PHP script

    xhttp.send();

    xhttp.onload = function() {
        const hasSession = xhttp.responseText.trim(); // Get result from PHP
        
        let userData = null;

        if (hasSession != 'false') {
            userData = JSON.parse(hasSession);
        }

        if (userData != null){

            if (userData['remember'] == 'on') {
                if (userData['username'] != 'admin') {
                    window.location.href = "userLogged.php";
                }
                else {
                    window.location.href = "adminLogged.php";
                } 
            }

        }
    };
}

function registerUser() {
    const form = document.getElementById("registerForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "processRegister.php", true);

        const formData = new FormData(form);
        xhttp.send(formData);

        xhttp.onload = function () {
            const result = xhttp.responseText.trim();

            if (result == "success") {
                alert("Registration successful!");
                window.location.href = "login.php"; // Redirect to login or user page
            } else {
                alert("Registration failed: " + result);
            }
        };
    });
}
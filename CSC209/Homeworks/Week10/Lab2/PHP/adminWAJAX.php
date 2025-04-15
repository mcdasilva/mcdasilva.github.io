<?php include_once 'saveUsers.php'; ?>

<!DOCTYPE html>
<html>
    <head>
        <title>Form Result</title>
    </head>
    <body>

        <?php 
            $username = $_POST["un"];
            $password = $_POST["pw"];
        ?>

        <h1>User Submission Received</h1>

        <div id="usersData">
            <?php
                if (!empty($username) && !empty($password)){
                    echo "User saved: " . htmlspecialchars($username) . "<br>";
                }
            ?>

            <?php include_once 'getUsers.php'; ?>
        </div>
        
        <div id="reload">
            <button type="button" onclick="reloadDoc()">Reload</button>
        </div>

        <script>
            function reloadDoc() {
                const xhttp = new XMLHttpRequest();
                xhttp.onload = function() {
                    document.getElementById("usersData").innerHTML =
                    this.responseText;
                }
                xhttp.open("GET", "getUsers.php");
                xhttp.send();
            }
            
            // Call reloadDoc() every 15 seconds
            setInterval(reloadDoc, 15000);
        </script>

    </body>
</html>
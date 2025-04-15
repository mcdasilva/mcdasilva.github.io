<?php include 'saveUsers.php'; ?>

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

        <?php
            if ($username && $password){
                echo "User saved: " . htmlspecialchars($username) . "<br>";
            }
        ?>

        <?php
            $numUsers = countUsers();

            $text = "";
            if ($numUsers == 1) {
                $text = "There is $numUsers user registered in the website.";
            } else {
                $text = "There are $numUsers users registered in the website.";
            }
        ?>

        <pre><?=$text;?></pre>
        
        <pre>These are the users:<br><?=printUsers()?></pre>
        
        <form action="admin.html.php" method="post">
            <input type="submit" value="Reload">
        </form>

    </body>
</html>
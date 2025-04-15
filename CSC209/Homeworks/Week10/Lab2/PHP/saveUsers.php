<html>

    <head>
        <?php include_once 'myLib.php';?>
    </head>

    <body>

        <?php 
            $username = $_POST["un"];
            $password = $_POST["pw"];
        ?>

        <?php
            saveUser($username, $password);
        ?>

    </body>
</html>
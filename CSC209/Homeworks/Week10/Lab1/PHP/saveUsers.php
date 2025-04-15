<html>
    <body>

        <?php 
            $username = $_POST["un"];
            $password = $_POST["pw"];
        ?>

        <?php
            $file = fopen("../Output/users.txt","w");
            echo fwrite($file, "[username => $username, password => $password]");
            fclose($file);
        ?>

        Welcome <?php echo $_POST["un"]; ?><br>
        Your email address is: <?php echo $_POST["pw"]; ?>



    </body>
</html>
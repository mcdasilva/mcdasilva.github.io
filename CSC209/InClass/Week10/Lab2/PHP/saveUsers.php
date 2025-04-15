<html>
    <body>

        <?php 
            $username = $_POST["un"];
            $password = $_POST["pw"];
        ?>

        <?php

            $file = fopen("../Output/users.txt","a");
            fwrite($file, "[username => $username, password => $password]"."\n");
            fclose($file);
        ?>

        Welcome <?php echo $_POST["un"]; ?><br>
        Your email address is: <?php echo $_POST["pw"]; ?>



    </body>
</html>
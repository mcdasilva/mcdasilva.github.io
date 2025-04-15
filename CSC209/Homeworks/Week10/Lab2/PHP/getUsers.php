<!DOCTYPE HTML>
<html>  

    <head>

        <?php include_once 'myLib.php';?>

    </head>

    <body>
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

    </body>
</html>
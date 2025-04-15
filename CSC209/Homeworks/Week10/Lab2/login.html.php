<!DOCTYPE HTML>
<html>  

    <head>

        <?php include 'PHP\myLib.php';?>

    </head>

    <body>

        <pre>This page figures out its whereabouts</pre>

            <?php 
                $absPath = realpath("login.html.php");
            ?>

        <pre>My week number is <?=extractFolderNumber($absPath)?>. </pre>

        <form action="PHP/adminWAJAX.php" method="post">
            Username: <input type="text" name="un"><br>
            Password: <input type="text" name="pw"><br>
            <input type="submit">
        </form>

    </body>
</html>
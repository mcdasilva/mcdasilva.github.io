<!DOCTYPE html>
<html>
    <head>
        <?php include 'PHP\myLib.php';?>
    </head>
    <body>
        <pre>This page figures out its whereabouts</pre>

        <?php 
            $absPath = realpath("whereami2.php");
        ?>

        <pre>My week number is <?=extractFolderNumber($absPath)?>. </pre>
    </body>
</html>
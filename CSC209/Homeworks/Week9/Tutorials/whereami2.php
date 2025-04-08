<!DOCTYPE html>
<html>
    <head>

        <!-- External CSS -->
        <link rel="stylesheet" href="../CSSStyles/stylesGeneral.css">

        <link rel="icon" type="image/x-icon" href="../../../StartPage/ImagesStartPage/favIconStartPage.png">

        <?php include '..\PHP\myLib.php';?>
    </head>
    <body class="tutorial">

        <div class="mainButtons">

            <a href="../../../StartPage/startPage.html">
                <button>
                    <img src="../Images/homeButton.png" 
                    alt="Home button">
                </button>
            </a>

            <a href="../homework9.html">
                <button>
                    <img src="../Images/backButton.png" alt="Back button">
                </button>
            </a>

            <a href="tutorials.html">
                <button>
                    Tutorials Page
                </button>
            </a>

        </div>

        <pre>This page figures out its whereabouts</pre>

        <?php 
            $absPath = realpath("whereami2.php");
        ?>

        <pre>My week number is <?=extractFolderNumber($absPath)?>. </pre>
    </body>
</html>
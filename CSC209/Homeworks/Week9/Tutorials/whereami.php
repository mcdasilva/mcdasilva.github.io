<!DOCTYPE html>
<html>
    <head>

        <!-- External CSS -->
        <link rel="stylesheet" href="../CSSStyles/stylesGeneral.css">

        <link rel="icon" type="image/x-icon" href="../../../StartPage/ImagesStartPage/favIconStartPage.png">

        <?php
            $absPath = realpath("whereami.php");
            $absPathNoExt = substr($absPath, 0, strrpos($absPath, '.'));
            $separatePath = explode('\\', $absPathNoExt);
            $currentFolder = $separatePath[count($separatePath)-3];

            $weekNrString = $currentFolder[strlen($currentFolder)-1];
            $weekNrInt = ctype_digit($weekNrString) ? (int) $weekNrString : $weekNrString;
        ?>
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
        <pre>My week number is <?=$weekNrInt?>. </pre>
    </body>
</html>
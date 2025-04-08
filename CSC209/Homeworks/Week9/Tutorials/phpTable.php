<?php
    $COLUMNS = array('First name', 'Last name', 'Age');
    $CONTENT = array(array(0, 1, 2), array(3, 4, 5), array(6,7,8), array(9,10,11), array(12, 13, 14), array(15,16,17));
?>

<html>
    <head>
        <!-- External CSS -->
        <link rel="stylesheet" href="../CSSStyles/stylesGeneral.css">

        <link rel="icon" type="image/x-icon" href="../../../StartPage/ImagesStartPage/favIconStartPage.png">
    </head>

    <body class="tutorial">

        <div class="mainButtons">

            <a href="../../../StartPage/startPage.html">
                <button>
                    <img src="../Images/homeButton.png" 
                    alt="Home button">
                </button>
            </a>

            <a href="../homework8.html">
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

        <table border=1>
            <?php

                foreach($COLUMNS as $column){
                    echo("<th> $column </th>");
                }


                for($i = 0; $i < count($CONTENT); $i++){
                    echo("<tr>");
                        echo("<td> {$CONTENT[$i][0]} </td>");
                        echo("<td> {$CONTENT[$i][1]} </td>");
                        echo("<td> {$CONTENT[$i][2]} </td>");
                    echo("</tr>");

                }
            ?>
        </table>
        
    </body>
</html>
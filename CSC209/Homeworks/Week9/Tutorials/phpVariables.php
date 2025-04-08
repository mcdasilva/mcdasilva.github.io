<!DOCTYPE html>
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

        <?php
            $x = 5;
            var_dump($x);
        ?>

        <br><br>

        <pre>

            <?php
                var_dump(5);
                var_dump("John");
                var_dump(3.14);
                var_dump(true);
                var_dump([2, 3, 56]);
                var_dump(NULL);
            ?>

        </pre>

        <br><br>

        <?php
            $x = $y = $z = "Fruit";

            echo $x;
            echo $y;
            echo $z;

        ?>

        <br><br>

        <?php
            $x = 5;
            $y = 10;

            function myTest() {
            $GLOBALS['y'] = $GLOBALS['x'] + $GLOBALS['y'];
            } 

            myTest();
            echo $y;
        ?>

    </body>
</html>

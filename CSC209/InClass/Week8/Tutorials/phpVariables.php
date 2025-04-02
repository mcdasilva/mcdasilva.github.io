<!DOCTYPE html>
<html>
    <body>

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

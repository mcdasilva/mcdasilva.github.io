<!DOCTYPE html>
<html>
    <body>

    <pre>
        <?php  
        $cars = array("brand" => "Ford", "model" => "Mustang");
        $cars += ["color" => "red", "year" => 1964];

        //Output the array:
        var_dump($cars);
        ?>
    </pre>

    </body>
</html>
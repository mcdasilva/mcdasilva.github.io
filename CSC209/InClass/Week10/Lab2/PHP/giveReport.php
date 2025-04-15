<!DOCTYPE HTML>
<html>  

    <body>

        <pre>This page tells you how many users you have.</pre>

            <?php 
                function countUsers(){

                    $file = fopen("../Output/users.txt", "r");
    
                    $numUsers = 0;

                    while(!feof($file)) {
                        fgets($file);
                        $numUsers++;
                    }
                    fclose($file);

    
                    return $numUsers;
                    
                }

                $numUsers = countUsers();

                
                $text = "";
                if ($numUsers == 1) {
                    $text = "There is $numUsers user registered in the website.";
                } else
                    $text = "There are $numUsers users registered in the website.";
            
            ?>

        <pre><?=$text?></pre>

    </body>
</html>
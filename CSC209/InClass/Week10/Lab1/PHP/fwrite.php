<?php
    $file = fopen("../test2.txt","w");
    echo fwrite($file,"Hello World. Testing!");
    fclose($file);
?>
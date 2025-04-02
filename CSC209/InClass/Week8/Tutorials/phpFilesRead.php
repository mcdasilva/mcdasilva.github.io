<!DOCTYPE html>
<html>
<body>

<?php
$file = fopen("webdictionary.txt","r");
fread($file,filesize("webdictionary.txt"));
fclose($file);
?>

</body>
</html>
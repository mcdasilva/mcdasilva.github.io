<!DOCTYPE html>
<html>
    <head>
        <?php
            $absPath = realpath("whereami.php");
            $absPathNoExt = substr($absPath, 0, strrpos($absPath, '.'));
            $separatePath = explode('\\', $absPathNoExt);
            $currentFolder = $separatePath[count($separatePath)-2];

            $weekNrString = $currentFolder[strlen($currentFolder)-1];
            $weekNrInt = ctype_digit($weekNrString) ? (int) $weekNrString : $weekNrString;
        ?>
    </head>
    <body>
        <pre>This page figures out its whereabouts</pre>
        <pre>My week number is <?=$weekNrInt?>. </pre>
    </body>
</html>
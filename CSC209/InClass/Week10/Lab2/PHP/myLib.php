<?php
    function extractFolderNumber($absPath){
        // $absPathNoExt = substr($absPath, 0, strrpos($absPath, '.'));

        // echo $absPathNoExt;

        $separatePath = explode('\\', $absPath);

        $currentFolder = $separatePath[count($separatePath)-3];

        $currentFolder = strrev($currentFolder);
        
        $weekNrInt = '';
        for ($i = 0; $i < strlen($currentFolder); $i++){
            $weekNrString = $currentFolder[$i];

            if (ctype_digit($weekNrString)){
                $weekNrInt .= $weekNrString;
            }

            else {break;}
        }


        $weekNrInt = (int) strrev($weekNrInt);
        
        return $weekNrInt;
    }


    function countUsers($usersPath){

        $file = fopen("Output/users.txt", "a");

        $numUsers = 0;
        while(!feof($file)) {
            // fgets($file);
            $numUsers++;
        }
        fclose($file);

        return $numUsers;
        
    }
?>
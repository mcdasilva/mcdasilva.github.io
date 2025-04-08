<?php
    function extractFolderNumber($absPath){
        $absPathNoExt = substr($absPath, 0, strrpos($absPath, '.'));
        $separatePath = explode('\\', $absPathNoExt);
        $currentFolder = $separatePath[count($separatePath)-2];

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
?>
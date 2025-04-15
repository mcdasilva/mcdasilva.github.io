<?php
    function extractFolderNumber($absPath){

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


    function countUsers(){

        $file = fopen("../Output/users.txt", "r");

        $numUsers = 0;

        while(!feof($file)) {
            $line = fgets($file);

            $data = json_decode($line, true);

            if (strlen($data['username']) > 0){
                $numUsers++;
            }
        }
        fclose($file);


        return $numUsers;
        
    }

    function printUsers(){

        $file = fopen("../Output/users.txt", "r");

        $userNum = 1;

        $users = '';
        while(!feof($file)) {
            $line = fgets($file);
            $data = json_decode($line, true);

            if (strlen($data['username']) > 0){
                $users .= $userNum . ". " . $data['username'] . "\n";
                $userNum++;
            }
        }
        fclose($file);


        return $users;
        
    }

    function saveUser($username, $password){

        if (!empty($username) && !empty($password)){
            $file = fopen("../Output/users.txt","a");

            $data = ['username' => $username, 'password' => $password];
            
            fwrite($file, json_encode($data) . "\n");

            fclose($file);

        }

    }

?>
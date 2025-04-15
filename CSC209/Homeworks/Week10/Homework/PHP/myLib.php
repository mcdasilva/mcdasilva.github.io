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


    function countUsers() {
        $filePath = "../Output/users.json";
    
        if (!file_exists($filePath)) {
            return 0; // No file, no users
        }
    
        $json = file_get_contents($filePath);
        $users = json_decode($json, true);
    
        if (!is_array($users)) {
            return 0; // Something went wrong with decoding
        }

        return count($users)-1; // Exclude the admin user
    }

    function printUsers() {
        $filePath = "../Output/users.json";
    
        if (!file_exists($filePath)) {
            return "No users found.\n";
        }
    
        $json = file_get_contents($filePath);
        $userArray = json_decode($json, true);
    
        if (!is_array($userArray)) {
            return "Invalid user data.\n";
        }
    
        $userNum = 1;
        $users = '';
    
        foreach ($userArray as $user) {
            if (!empty($user['username']) && $user['username'] != 'admin') {
                $users .= $userNum . ". " . $user['username'] . "\n";
                $userNum++;
            }
        }
    
        return $users;
    }

    function saveUser($username, $password){
        $filePath = "../Output/users.json";

        if (empty($username) || empty($password)) {
            return false;
        }
    
        // Load existing users
        if (file_exists($filePath)) {
            $json = file_get_contents($filePath);
            $users = json_decode($json, true);
        } else {
            $users = [];
        }

        // Check for existing username
        foreach ($users as $user) {
            if ($user['username'] == $username) {
                return false;
            }
        }
    
        // Append new user
        $users[] = ['username' => $username, 'password' => $password];
    
        // Save full array back to the file
        file_put_contents($filePath, json_encode($users, JSON_PRETTY_PRINT));
        return true;
    
    }

    function checkLogin($username, $password){

        $filePath = "../Output/users.json";
    
        // Load existing users
        if (file_exists($filePath)) {
            $json = file_get_contents($filePath);
            $users = json_decode($json, true);
        } else {
            $users = [];
        }

        // Check for existing username
        foreach ($users as $user) {
            if ($user['username'] == $username && $user['password'] == $password) {
                if ($username == 'admin' && $password == 'admin') {
                    // Admin login
                    return "admin";
                }
                else{
                    // Successful login
                    return "true";
                }
            }
        }

        return "false"; 

    }

?>
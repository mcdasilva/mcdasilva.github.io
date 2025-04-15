<?php
    include_once 'myLib.php';

    $username = $_POST['un'];
    $password = $_POST['pw'];

    if (saveUser($username, $password)) {
        echo "success";
    } else {
        echo "Username already exists or input invalid.";
    }
?>
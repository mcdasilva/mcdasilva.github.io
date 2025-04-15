<?php
    session_start();

    if (isset($_SESSION['username']) && isset($_SESSION['password'])) {
        echo json_encode([
            'username' => $_SESSION['username'],
            'password' => $_SESSION['password'],
            'remember' => $_SESSION['remember']
        ]);
    }
    else {
        echo "false";
    }

?>
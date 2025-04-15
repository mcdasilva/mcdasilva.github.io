<?php
    session_start();            // Start the session
    session_unset();            // Unset all session variables
    session_destroy();          // Destroy the session data

    $goToLogin = $_GET['goToLogin'] ?? null; // Check if 'reload' parameter is set

    if ($goToLogin == null) {
        header("Location: login.php"); // Redirect to login or homepage
    }
?>
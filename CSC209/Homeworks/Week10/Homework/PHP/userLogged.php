<?php
    session_start();
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Welcome</title>

        <link rel="stylesheet" href="../CSS/generalStyles.css">

        <link rel="icon" type="image/x-icon" href="../../../../StartPage/ImagesStartPage/favIconStartPage.png">

        <style>
            .mainButtons {
                margin-top: 8px;
                margin-left: -92.6%;
                display:flex;
                align-items: center;
                gap: 10px;
            }

            .mainButtons button{
                background-color: rgb(29, 18, 101);
                padding: 0%;
                color: white;
                border: none;
                font-size: 35px;
                border-radius: 5px;
                cursor: pointer;
            }

            .mainButtons img{
                width: 50px; 
                height: 50px;
            }

            .mainButtons button:hover{
                background-color: rgb(70, 54, 172);
            }

        </style>

    </head>
    <body class='userLogged'>

        <div class="mainButtons" style="position: absolute; top: 0px; right: 1305px;">

            <a href="../../../../StartPage/startPage.html">
                <button>
                    <img src="../Images/homeButton.png" 
                    alt="Home button">
                </button>
            </a>

            <a href="login.php">
                <button>
                    <img src="../Images/backButton.png" alt="Back button">
                </button>
            </a>

            <a href="../homework10.html">
                <button>
                    Homework Page
                </button>
            </a>

        </div>

        <?php 
            $username = $_SESSION["username"];
        ?>

        <h1>Welcome, <?php echo htmlspecialchars($username); ?>!</h1>

        <form id="logoutForm" action="logout.php">
            <input type="submit" value="Logout">
        </form>

    </body>
</html>
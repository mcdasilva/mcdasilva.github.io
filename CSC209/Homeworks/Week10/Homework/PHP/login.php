<?php
    session_start();
?>


<!DOCTYPE html>
<html>
    <head>
        <title>Login Page</title>

        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="../CSS/loginStyle.css">

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
    <body>

        <div class="mainButtons" style="position: absolute; top: -10px; right: 1590px;">

            <a href="../../../../StartPage/startPage.html">
                <button>
                    <img src="../Images/homeButton.png" 
                    alt="Home button">
                </button>
            </a>

            <a href="../homework10.html">
                <button>
                    <img src="../Images/backButton.png" alt="Back button">
                </button>
            </a>

        </div>

        <h2>Modal Login Form</h2>

        <button onclick="document.getElementById('id01').style.display='block'" style="width:auto;">Login</button>

        <div id="id01" class="modal">
            <form id='loginForm' class="modal-content animate">
                <div class="imgcontainer">
                    <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>
                    <img src="../Images/loginAvatar.png" alt="Avatar" class="avatar">
                </div>

                <div class="container">
                    <label for="un"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="un" required>

                    <label for="pw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="pw" required>
                        
                    <button type="submit">Login</button>
                    <label>
                        <input type="checkbox" checked="checked" name="remember"> Remember me
                    </label>
                </div>

                <div class="container" style="background-color:#f1f1f1">
                    <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button>
                    <span class="psw">Don't have an account? <a href="register.php">Register</a></span>
                </div>
            </form>
        </div>

        <script src="../JavaScript/loginJs.js"></script>

        <!-- Variables -->
        <script>
            var modal = document.getElementById('id01');
        </script>

        <script>
            window.onload = function(){
                checkRememberMe();
                closeModal();
                checkLoginSuccess();
            }
        </script>

    </body>
</html>

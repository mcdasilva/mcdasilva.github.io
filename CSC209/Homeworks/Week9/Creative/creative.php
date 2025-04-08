<!DOCTYPE html>
<html>
    <head lang="en-US">
        <title>Creative</title>
        <meta charset="UTF-8"> 
        <meta name="keywords" content="HTML, CSS, JavaScript, PHP">
        <meta name="description" content="Homework 8">
        <meta name="author" content="Matheus Coutinho da Silva">
        <!-- <meta http-equiv="refresh" content="30"> -->
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <link rel="stylesheet" href="../CSSStyles/stylesSlideshow.css">

        <link rel="stylesheet" href="../CSSStyles/stylesLightMode.css">

        <link rel="icon" type="image/x-icon" href="../../../StartPage/ImagesStartPage/favIconStartPage.png">

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

            .headers {
                margin-left: 32%;
                display:flex;
                align-items: center;
                gap: 100px;
            }

            .headers p {
                color: black;
                background-color:rgb(174, 170, 230);
                border-radius: 10px;
                text-align: center;
                display: inline-block;
                font-size:medium;
                padding: 1%;
                width: 300px;
                margin-left: 0;
            }

            .headers h1, .headers h2, .headers h3, .headers h4, .headers h5, .headers h6 {
                color: black;
                font-size: 60px;
                background-color:rgb(174, 170, 230);
                padding: 1%;
                text-align: center;
                width: 500px;
                display: inline-block;
                border-radius: 10px;
            }

            hr {
                background-color: rgb(99, 91, 207);
                height: 2px;
                border: none;
            }

        </style>

    </head>

    <body class="creative">

        <div class="mainButtons">

                <a href="../../../StartPage/startPage.html">
                    <button>
                        <img src="../Images/homeButton.png" 
                        alt="Home button">
                    </button>
                </a>

                <a href="../homework9.html">
                    <button>
                        <img src="../Images/backButton.png" alt="Back button">
                    </button>
                </a>

            </div>

        <?php 
            $menuOption = isset($_GET['menuOption']) ? $_GET['menuOption'] : 'classes';

            $validOptions = [
                'classes' => 'Classes',
                'flowers' => 'Flowers',
                'cats'    => 'Cats'
            ];

            $imgsURL = "../Images/{$validOptions[$menuOption]}/*.jpg";

            $images = glob($imgsURL);
        ?>

        <?php 
            $currentIndex = isset($_GET['currentIndex']) ? (int)$_GET['currentIndex'] : 0;
            updateSlideIndex($currentIndex);

            $prev = $currentIndex - 1;
            updateSlideIndex($prev);

            $next = $currentIndex + 1;
            updateSlideIndex($next);

            function updateSlideIndex(&$n) {
                global $images;

                if ($n < 0) {
                    $n = count($images) - 1;
                }
                if ($n >= count($images)) {
                    $n = 0;
                }
            }
        
        ?>

        <?php

            $whatIs = array('classes' => 'Lecture', 
            'flowers' => 'Flower',
            'cats' => 'Cat');

            $slide = '';
            $dots = '';

            $imgNameWoutExtension = substr($images[$currentIndex], 0, strrpos($images[$currentIndex], '.'));
            $finalImgName = substr($imgNameWoutExtension, strrpos($images[$currentIndex], '/')+1);

            $imgNameAsArray = explode("-", $finalImgName);

            if (ctype_digit($imgNameAsArray[0])){
                $finalImgName = $imgNameAsArray[1];
            }
    
            $slide .= "<div class='mySlides fade' style='display: block;'>
                            <div class='numbertext'>" . $currentIndex+1 . '/' . count($images) . "</div>
                                <img src='" . $images[$currentIndex] . "' style='vertical-align: middle;'>" .
                            "<div class='text'>$whatIs[$menuOption] " . ($currentIndex + 1) . " - " . $finalImgName . "</div>
                        </div>";
        
            for ($i = 0; $i < count($images); $i++) {
                $isActive = $i == $currentIndex ? 'active' : '';
                $dots .= "<a href='?currentIndex=$i&imgsURL=$imgsURL&menuOption=$menuOption' class='dot $isActive'></a> ";
            }
            
            $slide .= "<!-- Next and previous buttons -->
            <a href='?currentIndex=$prev&imgsURL=$imgsURL&menuOption=$menuOption' class='prev'>&#10094;</a>
            <a href='?currentIndex=$next&imgsURL=$imgsURL&menuOption=$menuOption' class='next'>&#10095;</a>";

            echo "<div id='slideshow-mode' style='display: block;'>
                    <div id='slideshow' class='slideshow-container'>
                        $slide
                    </div>
                    <br>
                    <div id='dots' style='text-align:center'>
                        $dots
                    </div>
                </div>";

        ?>

        <form method="GET" style="position: relative; top: -120px;">
            <label for="images" class="normal">IMAGES </label>
            <select name="menuOption" id="images" class="prettySelect" onchange="this.form.submit()">

                <?php 
                    foreach($validOptions as $value => $label){
                        $isSelected = $menuOption == $value ? 'selected' : '';
                        echo "<option value='$value' $isSelected>$label</option>";
                    };
                ?>

            </select>
        </form>
    </body>
</html>
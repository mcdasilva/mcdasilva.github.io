<!DOCTYPE html>
<html>
    <head>
        <title>Technical Page - LVL 5 & 6</title>
        <meta charset="UTF-8"> 
        <meta name="keywords" content="HTML, CSS, JavaScript, PHP">
        <meta name="description" content="Homework 8">
        <meta name="author" content="Matheus Coutinho da Silva">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="../CSSStyles/stylesSlideshow.css">

    <link rel="icon" type="image/x-icon" href="../../../StartPage/ImagesStartPage/favIconStartPage.png">

    <style>
        body.technical {
            background-color: rgb(198, 209, 247);
        }

        .mainButtons {
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
    <body class="technical">

        <div class="mainButtons">

            <a href="../../../StartPage/startPage.html">
                <button>
                    <img src="../Images/homeButton.png" 
                    alt="Home button">
                </button>
            </a>

            <a href="../homework8.html">
                <button>
                    <img src="../Images/backButton.png" alt="Back button">
                </button>
            </a>

            <a href="technical.html">
                <button>
                    Technical Page
                </button>
            </a>

        </div>

        <hr>

        <?php 
            $menuOption = isset($_GET['menuOption']) ? $_GET['menuOption'] : 'classes';

            $imgsURL = "../Images/" . ucfirst($menuOption) . "/*.jpg";

            if (str_contains($imgsURL, 'Classes')) {
                $menuOption = 'classes';
            }
            else if (str_contains($imgsURL, 'Flowers')) {
                $menuOption = 'flowers';
            }

            $images = glob($imgsURL);
        ?>

        <form method="GET" style="position: absolute; top: 560px;">
            <label for="images" class="normal">IMAGES </label>
            <select name="menuOption" id="images" class="prettySelect" onchange="this.form.submit()">
                <option value="classes" <?php if ($menuOption == 'classes') echo 'selected'; ?>>CSC 209 Classes</option>
                <option value="flowers" <?php if ($menuOption == 'flowers') echo 'selected'; ?>>Flowers</option>
            </select>
        </form>

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
            'flowers' => 'Flower');

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
                                <img src='" . $images[$currentIndex] . "' style='width:100%; vertical-align: middle;'>" .
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
    </body>
</html>
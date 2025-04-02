<!DOCTYPE html>
<html>
    <head>
        <title>Technical Page - LVL 1</title>
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
            $WEEKS = ['Wed 1/29', 'Wed 2/5', 'Wed 12/5'];
            $TOPICS = ['Introduction to Web Programming: Basics of HTML and CSS.', 
            'HTML & CSS: Styling Web Pages and Layout Techniques.', 
            'JavaScript: Introduction'];

            $slide = '';
            $dots = '';

            $images = glob("../Images/Classes/*.jpg");

            for ($i = 0; $i < count($TOPICS); $i++) {
                $slide .= "<div class='mySlides fade'>
                    <div class='numbertext'>" . ($i + 1) . '/' . count($TOPICS) . "</div>
                        <img src='" . $images[$i] . "' style='width:100%; vertical-align: middle;'>
                    <div class='text'>Lecture " . ($i + 1) . " - " . $WEEKS[$i] . " - " . $TOPICS[$i] . "</div>
                </div>";
            
                $dots .= "<span class='dot' onclick='currentSlide(" . ($i + 1) . ")'></span>\n";
            }

            $slide .= "<!-- Next and previous buttons -->
            <a class='prev' onclick='plusSlides(-1)'>&#10094;</a>
            <a class='next' onclick='plusSlides(1)'>&#10095;</a>";

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

        <script src="../Javascript/slideshowJS.js"></script>
    </body>
</html>
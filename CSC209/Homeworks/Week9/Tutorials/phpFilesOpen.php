<!DOCTYPE html>
<html>
  <head>
        <!-- External CSS -->
        <link rel="stylesheet" href="../CSSStyles/stylesGeneral.css">

        <link rel="icon" type="image/x-icon" href="../../../StartPage/ImagesStartPage/favIconStartPage.png">
    </head>

    <body class="tutorial">

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

            <a href="tutorials.html">
                <button>
                    Tutorials Page
                </button>
            </a>

        </div>

  <?php
  $file = fopen("webdictionary.txt","r");
  //Output lines until EOF is reached
  while(! feof($file)) {
    $line = fgets($file);
    echo $line. "<br>";
  }

  fclose($file);
  ?>

  </body>
</html>
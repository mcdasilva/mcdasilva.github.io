   
function moveSquare(squareColor, squareId, initialPos, finalPos)
{   

    if (squareColor == 'red'){
        howToMove = function(square, currentPos){
            currentPos++; 
            square.style.top = currentPos + 'px'; 
            square.style.left = currentPos + 'px';
            return currentPos;
        };
    }

    else if (squareColor == 'blue'){
        howToMove = function(square, currentPos){
            currentPos--; 
            square.style.top = currentPos + 'px'; 
            square.style.left = currentPos + 'px';
            return currentPos;
        };
    }

    makeMove(squareColor, squareId, initialPos, finalPos, howToMove);
}


function makeMove(squareColor, squareId, initialPos, finalPos, howToMove){
    // Get the square 
    var square = document.getElementById(squareId);   

    // Get its initial position
    var currentPos = initialPos;

    // Get its speed
    var speed = document.getElementById(`${squareColor}Speed`).value;

    // Call stepFunction every [select.option.value]ms
    var stepSquareId = setInterval(stepSquare, speed);

    function stepSquare() {
        // When the square gets to the desired position, stop calling the function.
        if (currentPos == finalPos) {
            clearInterval(stepSquareId);
        
        // Move the square to the desired position pixel by pixel.
        } else {
            currentPos = howToMove(square, currentPos);
        }
    }
}



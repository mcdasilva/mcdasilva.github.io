window.intervals = [];

function createSquareContainer(squares){
    let squaresContainer = document.createElement('div');
    squaresContainer.setAttribute('id', 'squaresContainer');

    console.log(squaresContainer);

    for(let i=0; i < squares.length; i++){
        let square = document.createElement('div');
        square.setAttribute('class', 'square');
        square.setAttribute('id', `${i}-${squares[i][2]}-${squares[i][3]}`);
        square.style.top = squares[i][0] + 'px';
        square.style.left = squares[i][1] + 'px';
        square.direction = squares[i][2];
        square.style.backgroundColor = squares[i][3];

        square.style.animationName = `${squares[i][3]}Anim`;
        square.style.animationDuration = '4s';
        square.style.animationIterationCount = 'infinite';
        square.style.animationFillMode = 'both';
        square.style.animationTimingFunction = 'linear';

        squaresContainer.appendChild(square);
    }

    document.body.appendChild(squaresContainer);
}   

function moveAllSquares(squares){
    resetSquares(squares);

    for(let i = 0; i < squares.length; i++){
        let squareId = `${i}-${squares[i][2]}-${squares[i][3]}`;
        let topInitial = squares[i][0];
        let leftInitial = squares[i][1];
        let direction = squares[i][2];

        moveSquare(squareId, topInitial, leftInitial, direction);
    }
}


function moveSquare(squareId, topInitial, leftInitial, direction)
{   

    let howToMove;
    // If the square is in the top-left quadrant, it will move to the bottom-right quadrant
    if (topInitial <= 175 && leftInitial <= 175){
        howToMove = function(square, topPos, leftPos, stepSquareId){
            if (topPos + 50 < 400 && leftPos + 50 < 400) {
                if (direction == 'diagonal'){
                    topPos++;
                    leftPos++;
    
                    square.style.top = topPos + 'px'; 
                    square.style.left = leftPos + 'px';
                }
                else if (direction == 'vertical'){
                    topPos++;
    
                    square.style.top = topPos + 'px'; 
                }
                else if (direction == 'horizontal'){
                    leftPos++;
    
                    square.style.left = leftPos + 'px';
                }
                return [topPos, leftPos];
            }
            // When the square gets to the desired position, clear the interval.
            else {
                clearInterval(stepSquareId);
            }
        };
    }
    // If the square is in the top-right quadrant, it will move to the bottom-left quadrant
    else if (topInitial <= 175 && leftInitial > 175){
        howToMove = function(square, topPos, leftPos, stepSquareId){
            if (topPos + 50 < 400 && leftPos > 0) {
                if (direction == 'diagonal'){
                    topPos++;
                    leftPos--;
    
                    square.style.top = topPos + 'px'; 
                    square.style.left = leftPos + 'px';
                }
                else if (direction == 'vertical'){
                    topPos++;
    
                    square.style.top = topPos + 'px'; 
                }
                else if (direction == 'horizontal'){
                    leftPos--;
    
                    square.style.left = leftPos + 'px';
                }
                return [topPos, leftPos];
            }
            // When the square gets to the desired position, clear the interval.
            else {
                clearInterval(stepSquareId);
            }
        };
    }
    // If the square is in the bottom-left quadrant, it will move to the top-right quadrant
    else if (topInitial > 175 && leftInitial <= 175){
        howToMove = function(square, topPos, leftPos, stepSquareId){
            if (topPos > 0 && leftPos + 50 < 400) {
                if (direction == 'diagonal'){
                    topPos--;
                    leftPos++;
    
                    square.style.top = topPos + 'px'; 
                    square.style.left = leftPos + 'px';
                }
                else if (direction == 'vertical'){
                    topPos--;
    
                    square.style.top = topPos + 'px'; 
                }
                else if (direction == 'horizontal'){
                    leftPos++;
    
                    square.style.left = leftPos + 'px';
                }
                return [topPos, leftPos];
            }
            // When the square gets to the desired position, clear the interval.
            else {
                clearInterval(stepSquareId);
            }
        };
    }
    // If the square is in the bottom-right quadrant, it will move to the top-left quadrant
    else if (topInitial > 175 && leftInitial > 175){
        howToMove = function(square, topPos, leftPos, stepSquareId){
            if (topPos > 0 && leftPos > 0){
                if (direction == 'diagonal'){
                    topPos--;
                    leftPos--;
    
                    square.style.top = topPos + 'px'; 
                    square.style.left = leftPos + 'px';
                }
                else if (direction == 'vertical'){
                    topPos--;
    
                    square.style.top = topPos + 'px'; 
                }
                else if (direction == 'horizontal'){
                    leftPos--;
    
                    square.style.left = leftPos + 'px';
                }
                return [topPos, leftPos];
            }
            // When the square gets to the desired position, clear the interval.
            else {
                clearInterval(stepSquareId);
            }
        };
    }

    makeMove(squareId, topInitial, leftInitial, howToMove);
}


function makeMove(squareId, topInitial, leftInitial, howToMove){
    // Get the square 
    var square = document.getElementById(squareId);   

    // Get its initial position
    var topPos = topInitial;
    var leftPos = leftInitial;

    // Get its speed
    var speed = document.getElementById('speed').value;

    // Call stepFunction every [select.option.value]ms
    var stepSquareId = setInterval(stepSquare, speed);

    window.intervals.push(stepSquareId)

    function stepSquare() {
        // Move the square to the desired position pixel by pixel or clear the interval.
        let currentIntruction = howToMove(square, topPos, leftPos, stepSquareId);

        if (currentIntruction instanceof Array){
            topPos = currentIntruction[0];
            leftPos = currentIntruction[1];
        }
        
    }
}

function resetSquares(squares){
    let allSquares = document.querySelectorAll('#squaresContainer .square');

    console.log(allSquares);

    allSquares.forEach((square, i) => {
        square.style.top = squares[i][0] + 'px';
        square.style.left = squares[i][1] + 'px';
    });

    window.intervals.forEach(intervalId => {
        clearInterval(intervalId);
    });
}   



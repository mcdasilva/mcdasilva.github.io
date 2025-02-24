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
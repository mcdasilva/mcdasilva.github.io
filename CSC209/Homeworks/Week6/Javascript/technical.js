function createGrid(){

    const grid = document.getElementById('grid');

    if (grid) {
        grid.parentNode.removeChild(grid);
    }
    

    const gridSize = document.getElementById('gridSize').value;

    console.log(gridSize);

    const table = document.createElement('table');
    table.setAttribute('id', 'grid');

    table.style.position = 'relative';
    // table.style.left = '450px';
    table.style.backgroundColor = 'black';
    table.style.borderRadius = '10px';

    for(let i = 0; i < gridSize; i++){
        const row = document.createElement('tr');
        row.setAttribute('id', `row-${i}`);

        for(let j = 0; j < gridSize; j++){
            const column = document.createElement('td');
            column.setAttribute('id', `row-${i}-column-${j}`);
            column.style.cursor = 'pointer';
            column.style.transition = 'background-color 0s';

            if (gridSize == 20){
                table.style.left = '490px';
                column.style.padding = '15px';
            }
            else if (gridSize == 30) {
                table.style.left = '470px';
                column.style.padding = '10px';
            }
            else {
                table.style.left = '440px';
                column.style.padding = '8px';
            }

            row.appendChild(column);
        }

        table.appendChild(row);
    }

    document.body.appendChild(table);

    const animateButton = document.getElementById('animateButton');

    let buttonContent = animateButton.innerHTML;

    console.log('here: ', buttonContent);

    if (buttonContent == 'STOP ANIMATION'){
        animateButton.innerHTML = 'ANIMATE';
        clearAllIntervals();
    }
    

    changeCell(true);
    passGeneration();
    populateGrid();
    
}

function changeCell(firstTime=false){

    const cells = document.querySelectorAll('td');

    // console.log('cells: ', cells)

    const dead = window.dead;
    const alive = window.alive;
    const hoverColor = 'rgb(243, 193, 130)';

    const animateButton = document.getElementById('animateButton');
    const nextGenButton = document.getElementById('nextGenButton');
    

    // let genCells = [];

    cells.forEach(cell => {
        cell.addEventListener('click', function(){

            // console.log(animateButton.isAnimating)

            // console.log('here');
            
            if (cell.style.backgroundColor == alive) {
                // console.log('make it dead');
                // cell.classList.remove('alive');
                // cell.classList.add('dead');
                cell.style.backgroundColor = dead;

                if (window.intervals.length == 0 && !animateButton.isAnimating && !nextGenButton.nextWasClicked){
                    window.initialCells = window.initialCells.filter(id => id != cell);
                    console.log('initial: ', window.initialCells);
                }
            }
            else{
                // console.log('make it alive');
                cell.style.backgroundColor = alive;

                if (window.intervals.length == 0 && !animateButton.isAnimating && !nextGenButton.nextWasClicked){
                    window.initialCells.push(cell);
                    console.log('initial: ', window.initialCells);
                }

                
                // genCells.push(cell);
                
            }
            if (firstTime){
                // window.generations.length = 0;
                window.generations[0] = [...window.initialCells];
            }
            // window.generations.length = 0;
            // window.generations.push([...window.initialCells]);
            console.log('GEN: ', window.generations);
        });

        // Re-add hover effect
        cell.addEventListener('mouseover', function() {
            if (cell.style.backgroundColor != alive) {
                cell.style.backgroundColor = hoverColor; // Hover color
            }
        });

        cell.addEventListener('mouseout', function() {
            if (cell.style.backgroundColor == hoverColor) {
                cell.style.backgroundColor = dead; // Reset to dead color
            }
        });

    });

    // console.log('DURING ANIM: ', genCells);
    // window.generations.push(genCells);
}

function nextGen(event){

    const button = event.currentTarget; 

    const buttonID = button.getAttribute('id');
    
    let isAnimation = false;
    let buttonContent = button.innerHTML;

    console.log(buttonContent)

    if (buttonID == 'animateButton'){
        isAnimation = true;

        button.isAnimating = true;
        
        if (buttonContent == 'ANIMATE'){
            button.innerHTML = 'STOP ANIMATION';
        }
        else {
            button.innerHTML = 'ANIMATE';
        }
    }
    else {
        button.nextWasClicked = true;
    }


    if (isAnimation){
        if(buttonContent == 'ANIMATE'){
            let intervalID = setInterval(updateCells, 100);
            window.intervals.push(intervalID);
        }
        else{
            clearAllIntervals();
        }
    }

    else{
        updateCells();
    }
    

    function updateCells() {
        button.removeEventListener('click', nextGen);

        const cells = document.querySelectorAll('td');

        const gridSize = document.getElementById('gridSize').value;

        const dead = window.dead;
        const alive = window.alive;

        function countLiveNeighbors() {
            cells.forEach(cell => {

                const cellID = cell.getAttribute('id');

                const parts = cellID.split('-');

                // console.log('parts: ', parts)
                const row = +parts[1];
                const column = +parts[3];

                // console.log('row ', row)
                // console.log('column ', column)
                let neighbors = [];

                for (let i = row - 1; i <= row + 1; i++) {
                    for (let j = column - 1; j <= column + 1; j++) {
                        if ((i >= 0 && i < gridSize) && (j >= 0 && j < gridSize) && !(i == row && j == column)) {
                            const neighborID = `row-${i}-column-${j}`;
                            // Only add valid neighbors inside the grid
                            neighbors.push(document.getElementById(neighborID));
                        }
                    }
                }

                // allNeighbors.push(neighbors);
                let liveNeighbors = 0;

                // console.log(neighbors)
                for (let i = 0; i < neighbors.length; i++) {
                    const neighbor = neighbors[i];

                    // console.log(neighbor)
                    const neighborState = window.getComputedStyle(neighbor).backgroundColor;

                    if (neighborState == alive) {
                        liveNeighbors++;
                    }
                }

                cell.liveNeighbors = liveNeighbors;
            });
        }

        countLiveNeighbors();

        // const liveCells = Array.from(cells).filter(cell => cell.style.backgroundColor == alive);

        cells.forEach(cell => {

            let cellState = window.getComputedStyle(cell).backgroundColor;

            const liveNeighbors = +cell.liveNeighbors;

            // console.log(cell, cellState)
            if (cellState == alive) {
                // console.log('nous sommes ici')
                if (liveNeighbors < 2 || liveNeighbors > 3) {
                    // console.log('KILL');
                    cell.style.backgroundColor = dead;
                }
            }
            else {
                if (liveNeighbors == 3) {
                    // console.log('RESSURECT');
                    cell.style.backgroundColor = alive;
                }
            }

        });

        const liveCells = Array.from(cells).filter(cell => cell.style.backgroundColor == alive);

        window.generations.push([...liveCells]);

        console.log('ADD GEN: ', window.generations);

        setTimeout(() => {
            button.addEventListener('click', nextGen);
        }, 0);
    }
}

function passGeneration(){
    const button1 = document.getElementById('nextGenButton');
    const button2 = document.getElementById('animateButton');

    button1.addEventListener('click', nextGen);
    button2.addEventListener('click', nextGen);
}

function clearAllIntervals(){
    window.intervals.forEach(intervalID => {
        clearInterval(intervalID);
    });
    window.intervals.length = 0;
}

function createGridMenu() {
    const gridMenu = document.getElementById("gridMenu");

    const LABEL = document.createElement("label");
    // LABEL.style.display = "block";
    LABEL.style.position = 'absolute';
    LABEL.style.top = '460px';
    LABEL.setAttribute("class", "normal");
    LABEL.setAttribute("for", "gridSize");
    LABEL.textContent = "GRID SIZE ";

    const select = document.createElement("select");
    select.setAttribute("id", "gridSize");
    select.setAttribute("class", "prettySelect");

    const options = [
        { value: "20", text: "🔽 SMALL" },   
        { value: "30", text: "🔼 MEDIUM" },  
        { value: "40", text: "⏫ LARGE" } 
    ];

    options.forEach(optionData => {
        const option = document.createElement("option");
        option.value = optionData.value;
        option.textContent = optionData.text;
        select.appendChild(option);
    });
    
    LABEL.appendChild(select);

    gridMenu.appendChild(LABEL);

    gridMenu.addEventListener('input', createGrid);
}

function reset(){
    const button1 = document.getElementById('resetButton');
    const button2 = document.getElementById('previousGenButton');

    button1.addEventListener('click', resetCells);
    button2.addEventListener('click', resetCells);
}

function resetCells(event){

    const button = event.currentTarget;
    const buttonID = button.getAttribute('id');

    let arrayToCheck;
    if (buttonID == 'resetButton'){
        window.generations.length = 0;
        window.generations[0] = [...window.initialCells];
        arrayToCheck = window.initialCells;
        
    }

    else {
    
        window.generations.pop();
        
        arrayToCheck = window.generations[window.generations.length - 1] || [...window.initialCells];;
    }
    
    const dead = window.dead;
    const alive = window.alive;

    const animateButton = document.getElementById('animateButton');
    animateButton.isAnimating = false;

    const nextGenButton = document.getElementById('nextGenButton');
    nextGenButton.nextWasClicked = false;

    const cells = document.querySelectorAll('td');

    function resetCell(cell, arrayToCheck) {
        const cellIDs = arrayToCheck.map(c => c.id);
        if (cellIDs.includes(cell.id)) {
            cell.style.backgroundColor = alive;
        } else {
            cell.style.backgroundColor = dead;
        }
    }

    cells.forEach(cell => {

        // let arrayToCheck;
        if (buttonID == 'resetButton'){

            resetCell(cell, arrayToCheck);
        }
        else{

            console.log('CURRENT GENS: ', window.generations);

            console.log('LAST ARRAY: ', arrayToCheck);

            resetCell(cell, arrayToCheck);
            // console.log('GEN: ', arrayToCheck);
        }

    });
}

function createPopulateGridMenu() {
    const populateGridMenu = document.getElementById("populateGridMenu");

    const LABEL = document.createElement("label");
    // LABEL.style.display = "block";
    LABEL.style.position = 'absolute';
    LABEL.style.top = '560px';
    LABEL.setAttribute("class", "normal");
    LABEL.setAttribute("for", "gridPopulation");
    LABEL.textContent = "POPULATE GRID ";

    const select = document.createElement("select");
    select.setAttribute("id", "gridPopulation");
    select.setAttribute("class", "prettySelect");

    const options = [
        { value: "random", text: "🎲 RANDOM" },  
        { value: "glider", text: "✈️ GLIDER" },  
        { value: "block", text: "🔲 STILL BLOCK" }
    ];

    options.forEach(optionData => {
        const option = document.createElement("option");
        option.value = optionData.value;
        option.textContent = optionData.text;
        select.appendChild(option);
    });
    
    LABEL.appendChild(select);

    populateGridMenu.appendChild(LABEL);

    populateGridMenu.addEventListener('input', populateGrid);
}

function populateGrid() {
    const selectedPattern = document.getElementById('gridPopulation').value;

    console.log(selectedPattern);

    const gridSize = parseInt(document.getElementById("gridSize").value);
    const cells = document.querySelectorAll('td');
    const dead = window.dead;

    // Clear previous state
    window.initialCells.length = 0;
    window.generations.length = 0;
    cells.forEach(cell => cell.style.backgroundColor = dead);

    if (selectedPattern === "random") {
        populateRandom(cells, gridSize);
    } else if (selectedPattern === "glider") {
        populateGlider(gridSize);
    } else if (selectedPattern === "block") {
        populateStillBlock(gridSize);
    }
    
    console.log('INITIAL CELLS: ', window.initialCells);

    window.generations[0] = [...window.initialCells];
}

function populateRandom(cells, gridSize) {
    const numLiveCells = Math.floor(gridSize * gridSize * 0.2); // 20% of grid
    for (let i = 0; i < numLiveCells; i++) {
        let randomCell = cells[Math.floor(Math.random() * cells.length)];
        randomCell.style.backgroundColor = window.alive;
        window.initialCells.push(randomCell);
    }
}

function populateGlider() {

    const gliderPattern = [
        [1, 0], [2, 1], [0, 2], [1, 2], [2, 2]
    ];

    gliderPattern.forEach(([r, c]) => {
        let cell = document.getElementById(`row-${r}-column-${c}`);
        cell.style.backgroundColor = window.alive;
        window.initialCells.push(cell);
});
}

function populateStillBlock(gridSize) {

    const startRow = Math.floor(gridSize / 2);
    const startCol = Math.floor(gridSize / 2);

    const blockPattern = [
        [startRow, startCol], [startRow, startCol + 1],
        [startRow + 1, startCol], [startRow + 1, startCol + 1]
    ];

    blockPattern.forEach(([r, c]) => {
        let cell = document.getElementById(`row-${r}-column-${c}`);
        cell.style.backgroundColor = window.alive;
        window.initialCells.push(cell);
    });
}

function clearGrid() {
    const button = document.getElementById('clearGridButton');

    const dead = window.dead;

    button.addEventListener('click', function(){
        const cells = document.querySelectorAll('td');
        // Reset all cells to dead
        cells.forEach(cell => cell.style.backgroundColor = dead);

        // Clear stored generations
        window.initialCells.length = 0;
        window.generations.length = 0;

        console.log("Grid cleared!");

    })
}
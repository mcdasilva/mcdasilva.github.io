function createGrid(){

    const numRows = window.numRows;
    const numColumns = window.numColumns;

    const grid = document.getElementById('grid');

    const table = document.createElement('table');

    table.style.position = 'relative';
    table.style.left = '450px';
    table.style.backgroundColor = 'black';
    table.style.borderRadius = '10px';

    
    
    for(let i = 0; i < numRows; i++){
        const row = document.createElement('tr');
        row.setAttribute('id', `row-${i}`);

        for(let j = 0; j < numColumns; j++){
            const column = document.createElement('td');
            column.setAttribute('id', `row-${i}-column-${j}`);
            column.style.cursor = 'pointer';

            row.appendChild(column);
        }

        table.appendChild(row);
    }

    grid.appendChild(table);
    
}

function changeCell(){

    const cells = document.querySelectorAll('td');

    console.log('cells: ', cells)

    const dead = window.dead;
    const alive = window.alive;

    cells.forEach(cell => {
        cell.addEventListener('click', function(){

            console.log('here');
            
            if (cell.style.backgroundColor == alive) {
                console.log('make it dead');
                cell.style.backgroundColor = dead;
            }
            else{
                console.log('make it alive');
                cell.style.backgroundColor = alive;
            }
        })

    });

}

function nextGen(){

    const cells = document.querySelectorAll('td');

    cells.forEach(cell => {

        const id = cell.getAttribute('id');
        const row = id[4];
        const column = id[id.length - 1];

        let allNeighbors = [];

        for (let i = row-1; i < row+1; i++){
            let neighbors = [];
            for (let j = column-1; j < column+1; j++){
                neighbors.push(`row-${i}-column-${j}`);
            }
            allNeighbors.push(neighbors);
        }
        
    });
    

}
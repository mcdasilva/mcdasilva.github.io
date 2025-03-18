function removeRows(){
    const allRows = document.querySelectorAll('tr');

    allRows.forEach((element, i) => {
        if (i > 1){
            element.remove();
        }
    });
}

function addRow(CHECKCROSSBASIC, CHECKCROSSPRO){
    const ROW = `
    <tr>
        <td>Sample text</td>
        <td><i class="fa ${CHECKCROSSBASIC}"></i></td>
        <td><i class="fa ${CHECKCROSSPRO}"></i></td>
    </tr>`;

    const table = document.querySelector('table');

    table.innerHTML += ROW;
}

function addRows(CHECKCROSSBASIC, CHECKCROSSPRO){
    const nRows = window.nRows;

    for (let i = 0; i < nRows; i++){
        addRow(CHECKCROSSBASIC, CHECKCROSSPRO);
    }
}
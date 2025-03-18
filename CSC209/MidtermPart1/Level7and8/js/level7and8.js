function removeRows(){
    const allRows = document.querySelectorAll('tr');

    allRows.forEach((element, i) => {
        if (i > 1){
            element.remove();
        }
    });
}

function addRow(FEATURE='Sample text', CHECKCROSSBASIC='fa-check', CHECKCROSSPRO='fa-check'){
    const ROW = `
    <tr>
        <td>${FEATURE}</td>
        <td><i class="fa ${CHECKCROSSBASIC}"></i></td>
        <td><i class="fa ${CHECKCROSSPRO}"></i></td>
    </tr>`;

    const table = document.querySelector('table');

    table.innerHTML += ROW;
}

function addRowsEqual(FEATURE, CHECKCROSSBASIC, CHECKCROSSPRO){
    const nRows = window.nRows;

    for (let i = 0; i < nRows; i++){
        addRow(FEATURE, CHECKCROSSBASIC, CHECKCROSSPRO);
    }
}

function addRowsDifferent(FEATURES, BASIC, PRO){
    const nRows = window.nRows;

    for (let i = 0; i < nRows; i++){

        let feature = FEATURES[i];
        let basic = BASIC[i];
        let pro = PRO[i];

        addRow(feature, basic, pro);
    }
}
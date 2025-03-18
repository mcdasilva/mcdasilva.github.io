// Removes all rows from the table except the first two
function removeRows() {
    // Selects all table row elements
    const allRows = document.querySelectorAll('tr');
    
    // Iterates through the rows and removes each one starting from index 2 (i > 1)
    allRows.forEach((element, i) => {
        if (i > 1) {
            element.remove();
        }
    });
}

// Adds a single row to the table with specified feature and icons for basic and pro plans
function addRow(feature = 'Sample text', checkCrossBasic = 'fa-check', checkCrossPro = 'fa-check') {
    // Template for the new row, with icons for basic and pro columns
    const ROW = `
    <tr>
        <td>${feature}</td>
        <td><i class="fa ${checkCrossBasic}"></i></td>
        <td><i class="fa ${checkCrossPro}"></i></td>
    </tr>`;

    // Selects the first table element in the document
    const table = document.querySelector('table');

    // Appends the new row to the existing table content
    table.innerHTML += ROW;
}

// Adds multiple rows with the same feature and icons for basic and pro plans
function addRowsEqual(feature, checkCrossBasic, checkCrossPro) {
    // Retrieves the number of rows to add from a global variable
    const nRows = window.nRows;

    // Adds 'nRows' identical rows to the table
    for (let i = 0; i < nRows; i++) {
        addRow(feature, checkCrossBasic, checkCrossPro);
    }
}

// Adds multiple rows with different features and icons for basic and pro plans
function addRowsDifferent(features, basicData, proData) {
    // Retrieves the number of rows to add from a global variable
    const nRows = window.nRows;

    // Adds 'nRows' rows, each with unique feature and icon settings
    for (let i = 0; i < nRows; i++) {
        let feature = features[i];
        let basic = basicData[i];
        let pro = proData[i];

        // Adds the customized row to the table
        addRow(feature, basic, pro);
    }
}

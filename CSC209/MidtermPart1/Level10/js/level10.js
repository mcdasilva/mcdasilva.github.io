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
function addRow(feature = 'Sample text', checkCrossBasic = 'fa-check', checkCrossPro = 'fa-check', bgColor='white') {

    // New row, with a feature and icons for basic and pro columns
    const ROW = document.createElement('tr');

    ROW.style.backgroundColor = bgColor;

    let firstColumn = document.createElement('td');
    firstColumn.textContent = feature;

    ROW.appendChild(firstColumn);

    // Define the data for each column
    const columnData = [checkCrossBasic, checkCrossPro];

    // Iterate over the column data and dynamically create each column
    columnData.forEach(iconClass => {
        // Create a new table cell element
        let column = document.createElement('td');
        
        // Create an <i> element and set its class for the icon
        let columnDataElement = document.createElement('i');
        columnDataElement.setAttribute('class', `fa ${iconClass}`);
        
        // Append the icon to the column
        column.appendChild(columnDataElement);

        // Append the column to the row
        ROW.appendChild(column);
    });

    // Selects the first <table> element in the document.
    // Here, I am using querySelector instead of getElementById because there's only one table in the HTML.
    // If multiple tables existed, selecting by a unique ID would be more appropriate.
    const table = document.querySelector('table');
    

    // Appends the new row to the existing table content
    table.appendChild(ROW);
}

// Adds multiple rows with the same feature and icons for basic and pro plans
function addRowsEqual(feature, checkCrossBasic, checkCrossPro) {
    // Retrieves the number of rows to add from a global variable
    const nRows = window.nRows;

    // Adds 'nRows' identical rows to the table, but now alternating background colors manually 
    // (instead of even=light yellow, and odd=white, we'll have the opposite. If we don't do this, 
    // the first added row will not have the expected color, and this error will propagate to the 
    // subsequent rows as well.)
    // OBS.: we wouldn't need to to this if we removed ALL of the initial rows of the table before adding new ones.
    for (let i = 0; i < nRows; i++) {

        if (i % 2 == 0){
            addRow(feature, checkCrossBasic, checkCrossPro, 'white');
        }
        else{
            addRow(feature, checkCrossBasic, checkCrossPro, 'lightyellow');
        }
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

        // Adds the customized row to the table, but now alternating background colors manually.
        // (instead of even=light yellow, and odd=white, we'll have the opposite. if we don't do this, 
        // the first added row will not have the expected color, and this error will propagate to the 
        // subsequent rows as well.)
        // OBS.: we wouldn't need to to this if we removed ALL of the initial rows of the table before adding new ones.

        if (i % 2 == 0){
            addRow(feature, basic, pro, 'white');
        }
        else{
            addRow(feature, basic, pro, 'rgb(245, 245, 164)');
        }
    }
}

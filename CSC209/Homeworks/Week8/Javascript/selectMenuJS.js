// #################################################################################

function createImagesMenu() {
    const imagesMenu = document.getElementById("imagesMenu");

    const LABEL = document.createElement("label");
    // LABEL.style.display = "block";
    LABEL.style.position = 'absolute';
    LABEL.style.top = '560px';
    LABEL.setAttribute("class", "normal");
    LABEL.setAttribute("for", "images");
    LABEL.textContent = "IMAGES ";

    const SELECT = document.createElement("select");
    SELECT.setAttribute("id", "images");
    SELECT.setAttribute("class", "prettySelect");

    const options = [
        {value: "classes", text: "CSC 209 Classes"},  
        {value: "flowers", text: "Flowers" },
    ];

    options.forEach(optionData => {
        const option = document.createElement("option");
        option.value = optionData.value;
        option.textContent = optionData.text;
        SELECT.appendChild(option);
    });

    const curURL = new URL(window.location.href);
    const imgsURL = curURL.searchParams.get('imgsURL');

    if (imgsURL) {
        if (imgsURL.includes('Classes')) {
            SELECT.value = 'classes';
        } else if (imgsURL.includes('Flowers')) {
            SELECT.value = 'flowers';
        }
    }
    
    LABEL.appendChild(SELECT);

    imagesMenu.appendChild(LABEL);

    imagesMenu.addEventListener('input', populateSlideshow);

    function populateSlideshow() {
        const selectedImages = document.getElementById('images').value;

        let imgsURL = "../Images/XXXXXX/*.jpg";
    
        if (selectedImages === "classes") {
            imgsURL = imgsURL.replace('XXXXXX', 'Classes');
            selectedImages.value = 'classes';
        } else if (selectedImages === "flowers") {
            imgsURL = imgsURL.replace('XXXXXX', 'Flowers');
            selectedImages.value = 'classes';
        }

        // Update the query string with the selected value
        const newURL = new URL(window.location.href);
        newURL.searchParams.set('imgsURL', imgsURL);
        newURL.searchParams.set('currentIndex', 0);

        // Redirect to the new URL
        window.location.href = newURL.toString();

    }
}

// #################################################################################

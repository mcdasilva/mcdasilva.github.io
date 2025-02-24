function createSlider() {

    // Create slider
    const SLIDER = document.createElement("INPUT");
    SLIDER.setAttribute("type", "range");

    // Append slider to div
    document.getElementById("slider-container").appendChild(SLIDER);

    // Append image to div
    const IMG = document.createElement('img');
    IMG.src = '../Images/smiley.gif';
    IMG.style.transition = 'transform 0.3s';
    IMG.style.marginLeft = '20px';
    document.getElementById("slider-container").appendChild(IMG);

    // Add an event listener to detect slider movement
    SLIDER.addEventListener("input", function (){scaleImage(IMG, this.value);});
    
}

function scaleImage(img, sliderValue){
    const SCALE_FACTOR = sliderValue/100;
    img.style.transform = `scale(${2 * SCALE_FACTOR})`;
}

// <!--------------------------------------------------------------------------------------------------------------------------->

function createNumberBar() {

    // Create number bar
    const NUMBER_BAR = document.createElement("INPUT");
    NUMBER_BAR.setAttribute("type", "number");
    NUMBER_BAR.setAttribute("value", "1");
    NUMBER_BAR.setAttribute("min", "0");

    // Append number bar to div
    document.getElementById("number-container").appendChild(NUMBER_BAR);

    // Append image to div
    const IMG2 = document.createElement('img');
    IMG2.src = '../Images/smiley.gif';
    IMG2.style.marginLeft = '20px';
    document.getElementById("number-container").appendChild(IMG2);

    // Add an event listener to detect number bar interaction
    NUMBER_BAR.addEventListener("input", function (){addImage(IMG2, this.value);});
    
}

function addImage(img, numberValue){

    let currentImages = document.querySelectorAll('#number-container img');
    const NUM_CUR_IMG = currentImages.length;

    if (numberValue < NUM_CUR_IMG) {
        for (let i = 0; i < NUM_CUR_IMG - numberValue; i++){
            currentImages[NUM_CUR_IMG - (i+1)].remove();
        }
    } 
    else if (numberValue > NUM_CUR_IMG){
        for (let i = 0; i < numberValue - NUM_CUR_IMG; i++){
            const IMG_TO_ADD = document.createElement('img');
            IMG_TO_ADD.src = img.src;
            IMG_TO_ADD.style.marginLeft = '20px';
            document.getElementById("number-container").appendChild(IMG_TO_ADD);
        }
    }
}

// <!--------------------------------------------------------------------------------------------------------------------------->

function createRadioButton() {

    // Create 1st radio button
    const RADIO_BUTTON = document.createElement("INPUT");
    RADIO_BUTTON.setAttribute("type", "radio");
    RADIO_BUTTON.setAttribute("name", "radioButtons");

    // Create label for the 1st radio button
    const LABEL1 = document.createElement("label");
    LABEL1.textContent = "Smiling Face";
    LABEL1.appendChild(RADIO_BUTTON); // Attach radio button inside label

    // Create 2nd radio button
    const RADIO_BUTTON2 = document.createElement("INPUT");
    RADIO_BUTTON2.setAttribute("type", "radio");
    RADIO_BUTTON2.setAttribute("name", "radioButtons");

    // Create label for the 2nd radio button
    const LABEL2 = document.createElement("label");
    LABEL2.textContent = "Landscape";
    LABEL2.appendChild(RADIO_BUTTON2); // Attach radio button inside label


    // Append number bar to div
    document.getElementById("radio-container").appendChild(LABEL1);
    document.getElementById("radio-container").appendChild(document.createElement('br'));
    document.getElementById("radio-container").appendChild(LABEL2);
    document.getElementById("radio-container").appendChild(document.createElement('br'));
    document.getElementById("radio-container").appendChild(document.createElement('br'));

    // Append images to div
    const IMG3 = document.createElement('img');
    IMG3.src = '../Images/smiley.gif';
    IMG3.style.marginLeft = '20px';
    IMG3.style.display = 'none';
    document.getElementById("radio-container").appendChild(IMG3);

    const IMG4 = document.createElement('img');
    IMG4.src = '../Images/landscape.jpg';
    IMG4.style.marginLeft = '20px';
    IMG4.style.display = 'none';
    document.getElementById("radio-container").appendChild(IMG4);

    // Add an event listener to detect number bar interaction
    RADIO_BUTTON.addEventListener("click", function (){hideShowImg(0, IMG3, this);});
    RADIO_BUTTON2.addEventListener("click", function (){hideShowImg(1, IMG4, this);});
    
}

function hideShowImg(buttonIndex,imgToShow, button){

    allImages = document.querySelectorAll("#radio-container img");
    allImages.forEach(img => {
        img.style.display = 'none';
    });

    allButtons = document.querySelectorAll("#radio-container input[type='radio']");

    for (let i = 0; i < allButtons.length; i++){
        if (i != buttonIndex){
            allButtons[i].wasChecked = false;
        }
    }

    if (!button.wasChecked) {
        button.checked = true;
        imgToShow.style.display='block';
    }
    else {
        button.checked = false;
        imgToShow.style.display='none';
    }

    button.wasChecked = !button.wasChecked;
    
}
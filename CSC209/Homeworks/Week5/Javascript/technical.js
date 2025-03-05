function clearCanvas(){
    const ctx = window.ctx;
    const width = window.canvasW;
    const height = window.canvasH;

    // Fill the entire canvas with a white background
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);

}

function createParticles(particles=undefined, numParticles=undefined){

    if (!numParticles){
        numParticles = particles ? particles.length : window.numParticles;
    }

    if (!window.traceEnabled){
        clearCanvas();
    }

    console.log('NUM PARTS CREATE: ', numParticles)

    for (let i = 0; i < numParticles; i++){

        if (particles){
            let particle = particles[i];
            let [x, y, r] = particle[0];
            let [vecX, vecY, xDir, yDir] = particle[1];
            let style = particle[2];
            createParticle(x, y, r, vecX, vecY, xDir, yDir, style, false);
        }
        else{
            createParticle();
        }
    }

    if (!window.originalParts){
        window.originalParts = [];
    }

    let sizeDiff = Math.abs(window.particles.length - window.originalParts.length);

    console.log('size dif: ', sizeDiff)

    for(let i = window.particles.length - sizeDiff; i < window.particles.length; i++){
        window.originalParts.push(window.particles[i]);
    }
    // window.originalParts = structuredClone(window.particles);
    
}

function createParticle(x=undefined, y=undefined, r=undefined, vecX=undefined, vecY=undefined, xDir=undefined, yDir=undefined, style=undefined, save=true){

    const ctx = window.ctx;
    const width = window.canvasW;
    const height = window.canvasH;

    ctx.lineWidth = 1;

    if (!x){
        x = getRandomInt(100, width-100);
    }

    if (!y){
        y = getRandomInt(100, height-100);
    }

    if (!r){
        r = 25;
    }

    if (!style){
        let randomR = getRandomInt(50, 200);
        let randomG = getRandomInt(50, 200);
        let randomB = getRandomInt(50, 200);
        style = `rgb(${randomR} ${randomG} ${randomB} / 100%)`;
    }

    ctx.strokeStyle = style;

    // Circle
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI);
    ctx.stroke();

    // Vector
    ctx.beginPath();

    const vectorStrength = [-90, -60, -30, 30, 60, 90];

    // Line
    if (!xDir){
        xDir = vectorStrength[getRandomInt(0, 5)];
    }

    if (!yDir){
        yDir = vectorStrength[getRandomInt(0, 5)];
    }

    if (!vecX){
        vecX = x + xDir;
    }

    if (!vecY){
        vecY = y + yDir;
    }

    ctx.moveTo(x,y);
    ctx.lineTo(vecX, vecY);

    if (!window.particles){
        window.particles = [];
    }

    
    if (save) {
        // circle, vector, style
        window.particles.push([[x, y, r], [vecX, vecY, xDir, yDir], style]);

        if (window.interactive){
            window.numParticles++;
        }
    }

    ctx.stroke();
}

function randomizePos(){

    if (!window.particles){
        window.particles = [];
    }

    const button = document.getElementById('randomizeButton');
    const width = window.canvasW;
    const height = window.canvasH;

    button.addEventListener('click', function(){

        let numParticles = window.numParticles;

        clearCanvas();
        window.particles.length = 0;

        console.log('NUM PARTS RANDOM: ', numParticles)

        const vectorStrength = [-90, -60, -30, 30, 60, 90];

        for (let i = 0; i < numParticles; i++){

            let x = getRandomInt(100, width-100);
            let y = getRandomInt(100, height-100);
            let r = 25;
    
            let randomR = getRandomInt(50, 200);
            let randomG = getRandomInt(50, 200);
            let randomB = getRandomInt(50, 200);

            let xDir = vectorStrength[getRandomInt(0, 5)];
            let yDir = vectorStrength[getRandomInt(0, 5)];
    
            let vecX = x + xDir;
            let vecY = y + yDir;
    
            let style = `rgb(${randomR} ${randomG} ${randomB} / 100%)`;

            
            window.particles[i] = [[x, y, r], [vecX, vecY, xDir, yDir], style];
        }

        if (!window.originalParts){
            window.originalParts = [];
        }
    
        window.originalParts = structuredClone(window.particles);

        createParticles(window.particles, numParticles);
    })

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

// function clearCanvas(){
//     const ctx = window.ctx;
//     const width = window.canvasW;
//     const height = window.canvasH;

//     ctx.clearRect(0, 0, width, height);
    
// }

function moveParticle(particle, index){

    const width = window.canvasW;
    const height = window.canvasH;

    let speed = undefined;
    if (document.getElementById('speed')){
        speed = document.getElementById('speed').value;
    }

    console.log('SPEED: ', speed)

    let [x, y, r] = particle[0];
    let [vecX, vecY, xDir, yDir] = particle[1];
    let style = particle[2];

    if (x - r <= 0 || x + r >= width){
        xDir = -xDir;
    }

    if (y - r <= 0 || y + r >= height){
        yDir = -yDir;
    }

    if (speed){
        x += xDir/(50-speed);
        y += yDir/(50-speed);
    }
    else{
        x += xDir/50;
        y += yDir/50;
    }

    vecX = x + xDir;
    vecY = y + yDir;

    // console.log('PARTS ANIMA: ', window.particles)

    window.particles[index] = [[x, y, r], [vecX, vecY, xDir, yDir], style];

    createParticle(x, y, r, vecX, vecY, xDir, yDir, style, false);

}

function animateAllParticles(){

    const button = document.getElementById('animateButton');

    button.animating = false;

    let initialNumSteps = window.numSteps;

    if (window.numSteps <= 0){
        window.numSteps = initialNumSteps;
        button.innerHTML = 'RESTART ANIMATION';
    }

    button.addEventListener('click', function(){

        // let numParticles = window.numParticles;

        // console.log('ANIMA ALL : ', numParticles);

        button.animating = !button.animating;

        if (button.animating){
            button.innerHTML = 'STOP ANIMATION';
        }
        else{
            button.innerHTML = 'ANIMATE';
        }

        if (!window.intervals){
            window.intervals = [];
        }

        if (window.intervals.length > 0){
            clearAllIntervals();
            return;
        }

        const animationID = setInterval(function(){

            if (window.numSteps <= 0){
                clearAllIntervals();
                window.numSteps = initialNumSteps;
                button.innerHTML = 'CONTINUE ANIMATION';
                button.animating = false;
                return;
            }
            
            if (!window.traceEnabled){
                clearCanvas();
            }

            for (let i = 0; i < window.numParticles; i++){
                let particle = window.particles[i];
                moveParticle(particle, i);
            }
            
            window.numSteps--;

        }, 10);

        window.intervals.push(animationID);
    })

}

function clearAllIntervals(){
    window.intervals.forEach(intervalID => {
        clearInterval(intervalID);
    });
    window.intervals.length = 0;
}

function createNumberBar() {

    // Create number bar
    const NUMBER_BAR = document.createElement("INPUT");
    NUMBER_BAR.setAttribute("type", "number");
    NUMBER_BAR.setAttribute("value", "0");
    NUMBER_BAR.setAttribute("min", "0");
    NUMBER_BAR.setAttribute("class", "prettyInput");
    

    const LABEL = document.createElement("label");
    LABEL.setAttribute('class', 'normal');
    LABEL.textContent = "# of PARTICLES ";
    LABEL.appendChild(NUMBER_BAR); // Attach radio button inside label

    // Append number bar to div
    document.getElementById("number-container").appendChild(LABEL);

    // Add an event listener to detect number bar interaction
    NUMBER_BAR.addEventListener("input", function (){addRemoveParticle(this.value);});
    
}

function addRemoveParticle(numberValue){

    const numParticles = window.numParticles;
    const vectorStrength = [-90, -60, -30, 30, 60, 90];

    if (numberValue < numParticles) {
        for (let i = 0; i < numParticles - numberValue; i++){
            
            let indexToRemove = window.particles.length - 1;

            if (indexToRemove >= 0) {
                window.particles.splice(indexToRemove, 1);
                window.numParticles--;
            }
        }
        createParticles(window.particles);

        console.log('parts: ', window.particles)
        console.log('num parts: ', window.numParticles)
    } 
    else if (numberValue > numParticles){
        for (let i = 0; i < numberValue - numParticles; i++){
            if (!window.particles){
                window.particles = [];
            }

            let x = getRandomInt(100, width-100);
            let y = getRandomInt(100, height-100);
            let r = 25;

            let randomR = getRandomInt(50, 200);
            let randomG = getRandomInt(50, 200);
            let randomB = getRandomInt(50, 200);

            let xDir = vectorStrength[getRandomInt(0, 5)];
            let yDir = vectorStrength[getRandomInt(0, 5)];

            let vecX = x + xDir;
            let vecY = y + yDir;

            let style = `rgb(${randomR} ${randomG} ${randomB} / 100%)`;

            window.particles.push([[x, y, r], [vecX, vecY, xDir, yDir], style]);
            window.numParticles++;
        }
        createParticles(window.particles, numberValue);
        // }

        console.log('parts: ', window.particles)
        console.log('num parts: ', window.numParticles)
    }

}

function resetParticles(){

    if (!window.originalParts){
        window.originalParts = [];
    }


    const button = document.getElementById('resetButton');

    button.addEventListener('click', function(){

        clearCanvas();

        window.originalParts = window.originalParts.filter(particle => particle != undefined);

        let originalSize = window.originalParts.length;
        let currentSize = window.particles.length;

        while (originalSize != currentSize){
            window.originalParts.pop();
            originalSize--;
        }

        console.log('ORIGINAL: ', window.originalParts)
        window.particles = structuredClone(window.originalParts);
        createParticles(window.particles, undefined);
    })


}

function createTraceCheckbox() {
    // Create checkbox input
    const CHECKBOX = document.createElement("INPUT");
    CHECKBOX.setAttribute("type", "checkbox");
    CHECKBOX.setAttribute("id", "traceCheckbox");
    CHECKBOX.setAttribute("class", "prettyCheckbox");
    

    // Create label
    const LABEL = document.createElement("label");
    LABEL.setAttribute('class', 'normal');
    LABEL.style.marginLeft = '10px';
    LABEL.textContent = " TRACE ";
    LABEL.appendChild(CHECKBOX); // Attach checkbox inside label

    // Append label to div
    document.getElementById("number-container").appendChild(LABEL);

    // Add event listener to toggle tracing behavior
    CHECKBOX.addEventListener("change", function () {
        window.traceEnabled = this.checked; // Store trace state globally
        console.log("Trace mode:", window.traceEnabled);
    });
}

function createTemperatureMenu() {
    const temperatureMenu = document.getElementById("temperatureMenu");

    const LABEL = document.createElement("label");
    // LABEL.style.display = "block";
    LABEL.style.position = 'absolute';
    LABEL.style.top = '360px';
    LABEL.setAttribute("class", "normal");
    LABEL.setAttribute("for", "speed");
    LABEL.textContent = "TEMPERATURE ";

    const select = document.createElement("select");
    select.setAttribute("id", "speed");
    select.setAttribute("class", "prettySelect");

    const options = [
        { value: "40", text: "🔥 HIGH" },
        { value: "10", text: "🌡️ MEDIUM" },
        { value: "-120", text: "❄️ LOW" }
    ];

    options.forEach(optionData => {
        const option = document.createElement("option");
        option.value = optionData.value;
        option.textContent = optionData.text;
        select.appendChild(option);
    });
    
    LABEL.appendChild(select);

    temperatureMenu.appendChild(LABEL);
}


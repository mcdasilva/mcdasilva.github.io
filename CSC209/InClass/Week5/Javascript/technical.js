function createParticles(howMany){

    const ctx = window.ctx;
    const width = window.canvasW;
    const height = window.canvasH;

    for (let i = 0; i < howMany; i++){
        let x = width/2;
        let y = height/3 + i *100;

        let randomR = getRandomInt(50, 200);
        let randomG = getRandomInt(50, 200);
        let randomB = getRandomInt(50, 200);


        ctx.strokeStyle = `rgb(${randomR} ${randomG} ${randomB} / 100%)`;
        createParticle(x, y, 25);
    }
    
}

function createParticle(x, y, r){

    const ctx = window.ctx;

    ctx.lineWidth = 1;

    // Circle
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2*Math.PI);
    ctx.stroke();

    // Vector
    ctx.beginPath();

    const vectorStrength = [-90, -60, -30, 30, 60, 90];

    // Line
    let xDir = vectorStrength[getRandomInt(0, 5)];
    let yDir = vectorStrength[getRandomInt(0, 5)];

    console.log(xDir);
    console.log(yDir);

    let vecX = x + xDir;
    let vecY = y + yDir;

    ctx.moveTo(x,y);
    ctx.lineTo(vecX, vecY);
    ctx.stroke()
}

function randomizePos(){

    const button = document.getElementById('randomizeButton');

    button.addEventListener('click', function(){
        for (let i = 0; i < howMany; i++){

            let x = getRandomInt(50, width-100);
            let y = getRandomInt(50, height-100);
    
            let randomR = getRandomInt(50, 200);
            let randomG = getRandomInt(50, 200);
            let randomB = getRandomInt(50, 200);
    
    
            ctx.strokeStyle = `rgb(${randomR} ${randomG} ${randomB} / 100%)`;
            createParticle(x, y, 25);
        }
    })

}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


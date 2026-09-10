let dragging = false;

let points = [];
let scribbles = [];

let mode = "both";

let pointsSound;
let scribblesSound;

let pointsVolume = 0.0;
let scribblesVolume = 0.0;

let audioStarted = false;
let soundEnabled = true;
let soundStarting = false;
let soundRequest = 0;


function preload() {

    pointsSound = loadSound("/artwork/creative-coding/interactive-art/entangled/entangled_points_sound.wav");
    scribblesSound = loadSound("/artwork/creative-coding/interactive-art/entangled/entangled_scribbles_sound.wav");
}


function setup() {

    createCanvas(windowWidth, windowHeight);

    background(0);
    noFill();

    frameRate(60);

    pointsSound.setVolume(0.0001);
    scribblesSound.setVolume(0.0001);
}


function draw() {

    background(0);


    if (mode === "points" || mode === "both") {

        if (points.length >= 1) {

            for (let p of [...points]) {

                let isBeingDragged = (p === points[points.length - 1]) && dragging;


                if (isBeingDragged) {
                    p.currentX = mouseX;
                    p.currentY = mouseY;
                }


                p.drawPoints(isBeingDragged);

                p.move();

                p.loseLife(isBeingDragged);


                if (p.currentLife <= 0) {

                    let index = points.indexOf(p);

                    if (index !== -1) {
                        points.splice(index, 1);
                    }
                }
            }
        }
    }


    if (mode === "scribbles" || mode === "both") {

        if (scribbles.length >= 1) {

            for (let s of [...scribbles]) {

                let isBeingDragged = (s === scribbles[scribbles.length - 1]) && dragging;


                if (isBeingDragged) {
                    s.currentX = mouseX;
                    s.currentY = mouseY;
                }


                s.drawScribbles(isBeingDragged);

                s.move();

                s.loseLife(isBeingDragged);


                if (s.currentLife <= 0) {

                    let index = scribbles.indexOf(s);

                    if (index !== -1) {
                        scribbles.splice(index, 1);
                    }
                }
            }
        }
    }


    updateSound();
}


function mousePressed() {

    const soundReady = soundEnabled ? startSounds() : null;


    if (mode === "points" || mode === "both") {

        let p = new Points(mouseX, mouseY, 250);

        points.push(p);
    }


    if (mode === "scribbles" || mode === "both") {

        let s = new Scribbles(mouseX, mouseY, 13);

        scribbles.push(s);
    }


    dragging = true;

    return soundReady;
}


function mouseReleased() {

    dragging = false;


    if ((mode === "points" || mode === "both") && points.length > 0) {

        let p = points[points.length - 1];

        p.currentX = mouseX;
        p.currentY = mouseY;

        p.lockPoints();
    }


    if ((mode === "scribbles" || mode === "both") && scribbles.length > 0) {

        let s = scribbles[scribbles.length - 1];

        s.currentX = mouseX;
        s.currentY = mouseY;

        s.lockScribbles();
    }
}


function keyPressed(event) {

    if (key === "r" || key === "R") {

        points = [];
        scribbles = [];

        dragging = false;

        background(0);
    }


    else if (key === "p" || key === "P") {

        mode = "points";

        console.log("MODE: POINTS");
    }


    else if (key === "s" || key === "S") {

        mode = "scribbles";

        console.log("MODE: SCRIBBLES");
    }


    else if (key === "b" || key === "B") {

        mode = "both";

        console.log("MODE: BOTH");
    }


    else if (key === "q" || key === "Q" || key === "Escape" || keyCode === ESCAPE) {

        event?.preventDefault();
        if (!event?.repeat) return toggleSounds();
    }
}


function getPointsSoundLevel() {

    if (points.length === 0) {
        return 0;
    }


    let total = 0;


    for (let p of points) {

        let lifeRatio = p.currentLife / p.maxLife;

        total += lifeRatio;
    }


    return total / points.length;
}


function getScribblesSoundLevel() {

    if (scribbles.length === 0) {
        return 0;
    }


    let total = 0;


    for (let s of scribbles) {

        let lifeRatio = s.currentLife / s.maxLife;

        total += lifeRatio;
    }


    return total / scribbles.length;
}


function updateSound() {

    if (!audioStarted) {
        return;
    }


    let targetPointsVolume;
    let targetScribblesVolume;


    if ((mode === "points" || mode === "both") && points.length > 0) {

        let pointsLife = getPointsSoundLevel();

        targetPointsVolume = pointsLife * 0.35;
    }

    else {
        targetPointsVolume = 0;
    }


    if ((mode === "scribbles" || mode === "both") && scribbles.length > 0) {

        let scribblesLife = getScribblesSoundLevel();

        targetScribblesVolume = scribblesLife * 0.35;
    }

    else {
        targetScribblesVolume = 0;
    }


    if (targetPointsVolume > pointsVolume) {

        if (mode === "both") {
            pointsVolume += (targetPointsVolume - pointsVolume) * 0.01;
        }

        else {
            pointsVolume += (targetPointsVolume - pointsVolume) * 0.001;
        }
    }

    else {
        pointsVolume += (targetPointsVolume - pointsVolume) * 0.03;
    }


    if (targetScribblesVolume > scribblesVolume) {

        if (mode === "both") {
            scribblesVolume += (targetScribblesVolume - scribblesVolume) * 0.01;
        }

        else {
            scribblesVolume += (targetScribblesVolume - scribblesVolume) * 0.001;
        }
    }

    else {
        scribblesVolume += (targetScribblesVolume - scribblesVolume) * 0.03;
    }


    pointsSound.setVolume(max(pointsVolume, 0.0001));
    scribblesSound.setVolume(max(scribblesVolume, 0.0001));
}


function startSounds() {

    if (audioStarted || soundStarting) return Promise.resolve();

    const request = ++soundRequest;
    soundStarting = true;

    return userStartAudio()
        .then(() => {
            if (request !== soundRequest || !soundEnabled) return;

            pointsSound.loop();
            scribblesSound.loop();
            pointsSound.setVolume(0.0001);
            scribblesSound.setVolume(0.0001);
            audioStarted = true;
        })
        .catch((error) => {
            if (request === soundRequest) closeSounds();
            console.error("Could not start Entangled sound:", error);
        })
        .finally(() => {
            if (request === soundRequest) soundStarting = false;
        });
}


function toggleSounds() {

    if (audioStarted || soundStarting) {
        soundEnabled = false;
        closeSounds();
        return Promise.resolve();
    }

    soundEnabled = true;
    return startSounds();
}


function closeSounds() {

    soundRequest += 1;
    soundStarting = false;

    if (pointsSound) {
        pointsSound.stop();
    }


    if (scribblesSound) {
        scribblesSound.stop();
    }


    pointsVolume = 0;
    scribblesVolume = 0;

    audioStarted = false;
}


function windowResized() {

    resizeCanvas(windowWidth, windowHeight);
}

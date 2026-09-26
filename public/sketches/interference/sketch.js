let music;
let click_sound;

let audio_started = false;

let color_spots = [];


function preload() {

    music = loadSound("/artwork/creative-coding/interactive-art/interference/background_music.wav", undefined, () => {});

    click_sound = loadSound("/artwork/creative-coding/interactive-art/interference/click_sound.wav", undefined, () => {});
}


function setup() {

    createCanvas(windowWidth, windowHeight);

    pixelDensity(1);
    frameRate(60);
    strokeWeight(2);

    // The supplied track is already quiet; keep its original recorded level.
    music.setVolume(1);

    click_sound.setVolume(1);

    // Allow rapid click sounds to overlap
    click_sound.playMode("sustain");
}


function start_audio() {

    if (!audio_started) {

        userStartAudio();

        music.loop();

        audio_started = true;
    }
}


function play_click_sound() {

    if (click_sound.isLoaded()) {

        click_sound.play();
    }
}


function close_sounds() {

    if (music.isPlaying()) {
        music.stop();
    }

    click_sound.stop();
}


function reset() {

    color_spots = [];

    background(0);
}


function keyPressed() {

    if (key === "r" || key === "R") {

        reset();
    }

    else if (
        key === "q" ||
        key === "Q" ||
        keyCode === ESCAPE
    ) {

        close_sounds();

        noLoop();

        return false;
    }
}


function mousePressed() {

    start_audio();

    play_click_sound();

    let r = random(100, 255);
    let g = random(100, 255);
    let b = random(100, 255);
    let a = random(100, 200);

    let coords = [
        mouseX,
        mouseY,
        r,
        g,
        b,
        a
    ];

    color_spots.push(coords);
}


function draw_interference_waves_horizontal(
    how_many_horizontal,
    y_start,
    spacing,
    amplitude,
    frequency,
    speed,
    mouse_radius,
    rgba
) {

    let angular_frequency =
        TWO_PI * frequency / width;

    let phase_shift =
        frameCount * speed;

    let step =
        max(2, floor(width / 500));

    let radius_squared =
        mouse_radius * mouse_radius;


    for (
        let c = 0;
        c < how_many_horizontal;
        c++
    ) {

        let base_y =
            y_start +
            c * spacing;


        let previous_r = null;
        let previous_g = null;
        let previous_b = null;
        let previous_a = null;


        for (
            let t = 0;
            t < width;
            t += step
        ) {

            let mouse_effect;


            if (
                abs(t - mouseX) <= mouse_radius &&
                abs(base_y - mouseY) <= mouse_radius
            ) {

                let d = dist(
                    t,
                    base_y,
                    mouseX,
                    mouseY
                );

                mouse_effect = max(
                    0,
                    1 - d / mouse_radius
                );
            }

            else {

                mouse_effect = 0;
            }


            let normal_y =
                amplitude *
                sin(
                    angular_frequency * t +
                    phase_shift
                );


            let local_amplitude =
                amplitude * 3;

            let local_frequency =
                angular_frequency * 3;


            let disturbed_y =
                local_amplitude *
                sin(
                    local_frequency * t +
                    phase_shift
                );


            let y_t = lerp(
                normal_y,
                disturbed_y,
                mouse_effect * 2
            );


            let final_y =
                base_y + y_t;


            let current_r = rgba[0];
            let current_g = rgba[1];
            let current_b = rgba[2];
            let current_a = rgba[3];


            // Go backwards so newest color spot wins
            for (
                let i = color_spots.length - 1;
                i >= 0;
                i--
            ) {

                let spot =
                    color_spots[i];


                let spot_x =
                    spot[0];

                let spot_y =
                    spot[1];


                if (
                    abs(t - spot_x) >
                    mouse_radius
                ) {

                    continue;
                }


                if (
                    abs(final_y - spot_y) >
                    mouse_radius
                ) {

                    continue;
                }


                let dx =
                    t - spot_x;

                let dy =
                    final_y - spot_y;


                if (
                    dx * dx +
                    dy * dy <=
                    radius_squared
                ) {

                    current_r = spot[2];
                    current_g = spot[3];
                    current_b = spot[4];
                    current_a = spot[5];

                    break;
                }
            }


            // Only change stroke when necessary
            if (
                current_r !== previous_r ||
                current_g !== previous_g ||
                current_b !== previous_b ||
                current_a !== previous_a
            ) {

                stroke(
                    current_r,
                    current_g,
                    current_b,
                    current_a
                );

                previous_r = current_r;
                previous_g = current_g;
                previous_b = current_b;
                previous_a = current_a;
            }


            point(
                t,
                final_y
            );
        }
    }
}


function draw() {

    noFill();

    background(0);


    let mouse_radius =
        min(width, height) *
        0.22;


    // Match the wave proportions in the 1440-pixel-high documentation video.
    const display_scale = height / 1440;
    let amplitude = 50 * display_scale;
    const wave_speed = 0.02;

    let how_many_horizontal = 10;


    let horizontal_spacing =
        (height - 2 * amplitude) /
        (how_many_horizontal + 1);


    let y_start =
        amplitude +
        horizontal_spacing;


    draw_interference_waves_horizontal(
        how_many_horizontal,
        y_start,
        horizontal_spacing,
        amplitude,
        2,
        wave_speed,
        mouse_radius,
        [255, 255, 255, 100]
    );


    draw_interference_waves_horizontal(
        how_many_horizontal,
        y_start,
        horizontal_spacing,
        amplitude + 5 * display_scale,
        5,
        -wave_speed,
        mouse_radius,
        [255, 255, 255, 150]
    );


    draw_interference_waves_horizontal(
        how_many_horizontal,
        y_start,
        horizontal_spacing,
        amplitude - 5 * display_scale,
        10,
        wave_speed,
        mouse_radius,
        [255, 255, 255, 200]
    );
}


function windowResized() {

    resizeCanvas(
        windowWidth,
        windowHeight
    );
}

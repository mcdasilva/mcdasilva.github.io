let music = null;
let audioStarted = false;

let points_to_draw = [];
let current_point_index = 0;

let scene = 0;
let take = 0;

let wait_start = null;

let months = [
    "JAN", "FEB", "MAR",
    "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP",
    "OCT", "NOV", "DEC"
];

let selected_month = 0;
let selected_day = 0;


function preload() {

    soundFormats("wav");

    music = loadSound("/artwork/creative-coding/interactive-art/mayra/mayra_harp.wav", undefined, () => { music = null; });
}


function setup() {

    createCanvas(windowWidth, windowHeight);

    background(0);

    frameRate(60);


    // Try autoplay.
    // Some browsers will block this until user interaction.
    if (getAudioContext().state === "running") {

        music.loop();

        audioStarted = true;
    }
}


function draw() {

    if (scene === 0) {

        draw_month_grid();
    }

    else if (scene === 1) {

        draw_day_grid(selected_month);
    }

    else if (scene === 2) {

        build_pattern(
            selected_day,
            selected_month
        );
    }

    else {

        draw_pattern(100);
    }
}


function line_from_points(
    x1,
    y1,
    x2,
    y2,
    how_many_points
) {

    let angle = atan2(
        y2 - y1,
        x2 - x1
    );

    let line_size = dist(
        x1,
        y1,
        x2,
        y2
    );

    let dist_between_points =
        line_size / (how_many_points - 1);


    let r = random(0, 256);
    let g = 255;
    let b = random(0, 256);
    let a = 255;

    let rgba = [
        r,
        g,
        b,
        a
    ];


    for (let i = 0; i < how_many_points; i++) {

        let next_x =
            x1 +
            cos(angle) *
            (dist_between_points * i);

        let next_y =
            y1 +
            sin(angle) *
            (dist_between_points * i);


        points_to_draw.push([
            next_x,
            next_y,
            rgba
        ]);
    }
}


function build_tree(
    x1,
    y1,
    angle,
    line_size,
    angle_to_turn,
    reducing_factor
) {

    if (line_size <= 1) {

        return;
    }


    let x2 =
        x1 +
        cos(angle) *
        line_size;

    let y2 =
        y1 +
        sin(angle) *
        line_size;


    line_from_points(
        x1,
        y1,
        x2,
        y2,
        5
    );


    build_tree(
        x2,
        y2,
        angle,
        line_size * reducing_factor,
        angle_to_turn,
        reducing_factor
    );

    build_tree(
        x2,
        y2,
        angle + angle_to_turn,
        line_size * reducing_factor,
        angle_to_turn,
        reducing_factor
    );

    build_tree(
        x2,
        y2,
        angle - angle_to_turn,
        line_size * reducing_factor,
        angle_to_turn,
        reducing_factor
    );
}


function reset() {

    background(0);

    scene = 0;
    take = 0;

    points_to_draw = [];
    current_point_index = 0;

    wait_start = null;

    frameRate(60);
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

        if (
            music !== null &&
            music.isPlaying()
        ) {

            music.stop();
        }


        // Websites generally cannot close themselves.
        // Stop the sketch instead.
        noLoop();
    }
}


function mousePressed() {

    start_audio();


    if (scene === 0) {

        let month =
            get_month_clicked();


        if (month !== null) {

            selected_month = month;

            scene = 1;
        }
    }


    else if (scene === 1) {

        let day =
            get_day_clicked(
                selected_month
            );


        if (day !== null) {

            selected_day = day;

            background(0);

            scene = 2;
        }
    }
}


function start_audio() {

    if (audioStarted) {

        return;
    }


    userStartAudio();


    if (
        music !== null &&
        !music.isPlaying()
    ) {

        music.loop();
    }


    audioStarted = true;
}


function draw_month_grid() {

    background(0);


    let cols = 3;
    let rows = 4;


    let box_width =
        width * 9 / 40;

    let box_height =
        height * 0.125;


    let gap_x =
        box_width / 6;

    let gap_y =
        box_height / 6;


    let grid_width =
        cols * box_width +
        (cols - 1) * gap_x;

    let grid_height =
        rows * box_height +
        (rows - 1) * gap_y;


    let start_x =
        (width - grid_width) / 2;

    let start_y =
        (height - grid_height) / 2;


    // Title

    fill(255);

    noStroke();

    textAlign(
        CENTER,
        CENTER
    );

    textSize(
        min(width, height) *
        0.035
    );

    text(
        "Choose your birth month",
        width / 2,
        start_y -
        min(width, height) *
        0.06
    );


    for (let i = 0; i < months.length; i++) {

        let col =
            i % cols;

        let row =
            floor(i / cols);


        let x =
            start_x +
            col *
            (box_width + gap_x);

        let y =
            start_y +
            row *
            (box_height + gap_y);


        let hovering = (
            x <= mouseX &&
            mouseX <= x + box_width &&
            y <= mouseY &&
            mouseY <= y + box_height
        );


        if (hovering) {

            fill(255);
            stroke(255);
        }

        else {

            fill(0);
            stroke(80);
        }


        rect(
            x,
            y,
            box_width,
            box_height,
            30
        );


        if (hovering) {

            fill(0);
        }

        else {

            fill(255);
        }


        textAlign(
            CENTER,
            CENTER
        );

        textSize(
            min(width, height) *
            0.0375
        );


        text(
            months[i],
            x + box_width / 2,
            y + box_height / 2
        );
    }
}


function get_month_clicked() {

    let cols = 3;
    let rows = 4;


    let box_width =
        width * 9 / 40;

    let box_height =
        height * 0.125;


    let gap_x =
        box_width / 6;

    let gap_y =
        box_height / 6;


    let grid_width =
        cols * box_width +
        (cols - 1) * gap_x;

    let grid_height =
        rows * box_height +
        (rows - 1) * gap_y;


    let start_x =
        (width - grid_width) / 2;

    let start_y =
        (height - grid_height) / 2;


    for (let i = 0; i < months.length; i++) {

        let col =
            i % cols;

        let row =
            floor(i / cols);


        let x =
            start_x +
            col *
            (box_width + gap_x);

        let y =
            start_y +
            row *
            (box_height + gap_y);


        let clicked = (
            x <= mouseX &&
            mouseX <= x + box_width &&
            y <= mouseY &&
            mouseY <= y + box_height
        );


        if (clicked) {

            return i;
        }
    }


    return null;
}


function get_day_clicked(mon) {

    let how_many_days;


    if (mon === 1) {

        // February

        how_many_days = 29;
    }

    else if (
        [3, 5, 8, 10].includes(mon)
    ) {

        // Apr, Jun, Sep, Nov

        how_many_days = 30;
    }

    else {

        how_many_days = 31;
    }


    let cols = 7;
    let rows = 5;


    let box_width =
        width * 0.09;

    let box_height =
        height * 0.09;


    let gap_x =
        box_width / 6;

    let gap_y =
        box_height / 6;


    let grid_width =
        cols * box_width +
        (cols - 1) * gap_x;

    let grid_height =
        rows * box_height +
        (rows - 1) * gap_y;


    let start_x =
        (width - grid_width) / 2;

    let start_y =
        (height - grid_height) / 2;


    for (let i = 0; i < how_many_days; i++) {

        let col =
            i % cols;

        let row =
            floor(i / cols);


        let x =
            start_x +
            col *
            (box_width + gap_x);

        let y =
            start_y +
            row *
            (box_height + gap_y);


        let clicked = (
            x <= mouseX &&
            mouseX <= x + box_width &&
            y <= mouseY &&
            mouseY <= y + box_height
        );


        if (clicked) {

            return i + 1;
        }
    }


    return null;
}


function draw_day_grid(mon) {

    background(0);


    let how_many_days;


    if (mon === 1) {

        // February

        how_many_days = 29;
    }

    else if (
        [3, 5, 8, 10].includes(mon)
    ) {

        // Apr, Jun, Sep, Nov

        how_many_days = 30;
    }

    else {

        how_many_days = 31;
    }


    let cols = 7;
    let rows = 5;


    let box_width =
        width * 0.09;

    let box_height =
        height * 0.09;


    let gap_x =
        box_width / 6;

    let gap_y =
        box_height / 6;


    let grid_width =
        cols * box_width +
        (cols - 1) * gap_x;

    let grid_height =
        rows * box_height +
        (rows - 1) * gap_y;


    let start_x =
        (width - grid_width) / 2;

    let start_y =
        (height - grid_height) / 2;


    // Title

    fill(255);

    noStroke();

    textAlign(
        CENTER,
        CENTER
    );

    textSize(
        min(width, height) *
        0.035
    );


    text(
        "Choose your birth day",
        width / 2,
        start_y -
        min(width, height) *
        0.06
    );


    for (let i = 0; i < how_many_days; i++) {

        let col =
            i % cols;

        let row =
            floor(i / cols);


        let x =
            start_x +
            col *
            (box_width + gap_x);

        let y =
            start_y +
            row *
            (box_height + gap_y);


        let hovering = (
            x <= mouseX &&
            mouseX <= x + box_width &&
            y <= mouseY &&
            mouseY <= y + box_height
        );


        if (hovering) {

            fill(255);
            stroke(255);
        }

        else {

            fill(0);
            stroke(80);
        }


        rect(
            x,
            y,
            box_width,
            box_height,
            30
        );


        if (hovering) {

            fill(0);
        }

        else {

            fill(255);
        }


        textAlign(
            CENTER,
            CENTER
        );

        textSize(
            min(width, height) *
            0.0375
        );


        text(
            str(i + 1),
            x + box_width / 2,
            y + box_height / 2
        );
    }
}


function build_pattern(d, m) {

    let seed =
        m * 31 + d;


    let reducing_factor =
        0.42 +
        ((seed * 17) % 15) /
        100.0;


    let angle_to_turn =
        radians(
            30 +
            ((seed * 37) % 55)
        );


    let line_size1 =
        min(width, height) / 4 +
        angle_to_turn;

    let line_size2 =
        max(width, height) / 4 +
        angle_to_turn;


    build_tree(
        width / 2,
        height,
        radians(270),
        line_size1,
        angle_to_turn / 2,
        reducing_factor
    );

    build_tree(
        width / 2,
        0,
        radians(90),
        line_size1,
        angle_to_turn / 2,
        reducing_factor
    );


    build_tree(
        0,
        height / 2,
        radians(0),
        line_size2,
        angle_to_turn * 2,
        reducing_factor
    );

    build_tree(
        width,
        height / 2,
        radians(180),
        line_size2,
        angle_to_turn * 2,
        reducing_factor
    );


    build_tree(
        0,
        0,
        radians(45),
        line_size1,
        angle_to_turn * 4,
        reducing_factor
    );

    build_tree(
        width,
        0,
        radians(135),
        line_size1,
        angle_to_turn * 4,
        reducing_factor
    );


    build_tree(
        0,
        height,
        radians(-45),
        line_size1,
        angle_to_turn * 4,
        reducing_factor
    );

    build_tree(
        width,
        height,
        radians(-135),
        line_size1,
        angle_to_turn * 4,
        reducing_factor
    );


    scene += 1;
}


function draw_pattern(
    points_to_draw_at_once
) {

    if (take === 0) {

        for (
            let i = 0;
            i < points_to_draw_at_once;
            i++
        ) {

            if (
                current_point_index >=
                points_to_draw.length
            ) {

                take = 1;

                wait_start = millis();

                return;
            }


            let current_point =
                points_to_draw[
                    current_point_index
                ];


            let r =
                current_point[2][0];

            let g =
                current_point[2][1];

            let b =
                current_point[2][2];

            let a =
                current_point[2][3];


            stroke(
                r,
                g,
                b,
                a
            );


            point(
                current_point[0],
                current_point[1]
            );


            current_point_index += 1;
        }
    }

    else {

        frameRate(24);


        // Wait 5 seconds without
        // freezing the program

        if (take === 1) {

            if (
                millis() -
                wait_start >=
                5000
            ) {

                take = 2;
            }


            return;
        }


        // Slowly fade

        else if (
            2 <= take &&
            take < 30
        ) {

            noStroke();

            fill(
                0,
                0,
                0,
                60
            );

            rect(
                0,
                0,
                width,
                height
            );
        }


        // Make sure it reaches
        // completely black

        else if (take === 30) {

            background(0);
        }


        // Stay black briefly,
        // then reset

        else if (take >= 50) {

            reset();

            return;
        }


        take += 1;
    }
}


function windowResized() {

    resizeCanvas(
        windowWidth,
        windowHeight
    );

    reset();
}
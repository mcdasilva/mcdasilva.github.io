
let SOUND_ON=true;
const SNAKE_SPEED_MULTIPLIER=0.45;

let DESIGN_WIDTH=1920;
let DESIGN_HEIGHT=1080;
let scale_factor=1;

let snakes=[];
let rings=[];
let end_tips=[];

let started=false;
let starting=false;

let button_fade_in_frame=0;
let button_fade_in_frames=30;
let button_fade_out_frame=0;
let button_fade_out_frames=30;

let menu_from_black=false;
let reset_canvas=false;

let tip_alpha=255;
let tip_pulse=0;

let ending=false;
let fade_start_frame=0;
let fade_frames=300;
let pause_frames=60;

let MAX_SNAKES=1000;

let music=null;
let music_ended=false;

let heartbeat_index=0;
let animation_start_ms=0;

let heartbeat_times=[
    0.250,1.220,2.235,3.230,4.225,4.845,
    6.125,7.085,8.355,9.370,10.355,11.315,12.255,
    13.255,14.235,15.150,16.500,17.455,18.460,
    19.435,20.210,21.210,22.195,23.205,24.235,
    25.200,26.185,27.170,28.325,29.305,30.310,
    31.295,32.290,33.285,34.285,35.285,36.295,
    37.265,38.300,39.270,40.280,41.250,42.240,
    43.250,44.230,45.245,46.235
];


function preload(){

    if(SOUND_ON){
        soundFormats('wav');
        music=loadSound('/artwork/digital-art/creative-coding/animation/fireflies/background_music.wav', undefined, () => { music=null; });
    }
}


function setup(){

    let container=document.getElementById('animation-container');
    let canvas=createCanvas(container.clientWidth,container.clientHeight);
    canvas.parent('animation-container');

    pixelDensity(1);
    frameRate(30);
    update_scale();
    background(255);

    button_fade_in_frame=frameCount;

    if(SOUND_ON && music!=null){
        music.setVolume(1);

        music.onended(function(){
            music_ended=true;
        });
    }
}


function update_scale(){

    scale_factor=min(width/DESIGN_WIDTH,height/DESIGN_HEIGHT);
}


function s(value){

    return value*scale_factor;
}


function windowResized(){

    let container=document.getElementById('animation-container');

    resizeCanvas(container.clientWidth,container.clientHeight);
    update_scale();

    return_to_start();
}


function draw_start_screen(alpha_value=255){

    let button_w=width*0.4;
    let button_h=height*0.2;

    let button_x=width/2;
    let button_y=height/2;

    let hovering=mouseX>button_x-button_w/2 &&
        mouseX<button_x+button_w/2 &&
        mouseY>button_y-button_h/2 &&
        mouseY<button_y+button_h/2;

    rectMode(CENTER);

    stroke(0,alpha_value);
    strokeWeight(1);

    if(hovering){
        fill(0,alpha_value);
    }
    else{
        fill(255,alpha_value);
    }

    rect(button_x,button_y,button_w,button_h,s(120));

    noStroke();

    if(hovering){
        fill(255,alpha_value);
    }
    else{
        fill(0,alpha_value);
    }

    textAlign(CENTER,CENTER);
    textSize(min(button_w,button_h)/5);

    text('LISTEN',button_x,button_y);

    rectMode(CORNER);
}


function press_start(){

    if(!started && !starting){

        let button_w=width*0.4;
        let button_h=height*0.2;

        let button_x=width/2;
        let button_y=height/2;

        if(mouseX>button_x-button_w/2 &&
            mouseX<button_x+button_w/2 &&
            mouseY>button_y-button_h/2 &&
            mouseY<button_y+button_h/2){

            userStartAudio();

            starting=true;
            button_fade_out_frame=frameCount;
        }
    }
}


function mousePressed(){

    press_start();
    return false;
}


function touchStarted(){

    press_start();
    return false;
}


function begin_animation(){

    reset_animation();

    background(255);
    reset_canvas=false;

    started=true;
    starting=false;

    animation_start_ms=millis();

    if(music!=null){
        music_ended=false;
        music.play();
    }
}


function return_to_start(from_black=false){

    reset_animation();

    started=false;
    starting=false;

    menu_from_black=from_black;
    button_fade_in_frame=frameCount;
}


function reset_animation(){

    snakes=[];
    rings=[];
    end_tips=[];

    heartbeat_index=0;
    tip_alpha=255;
    tip_pulse=0;

    ending=false;
    fade_start_frame=0;

    reset_canvas=true;

    if(music!=null){
        if(music.isPlaying()){
            music.stop();
        }

        music_ended=false;
    }
}


function draw(){

    if(!started){

        if(starting){

            let fade_progress=constrain(
                (frameCount-button_fade_out_frame)/button_fade_out_frames,0,1);

            background(255);

            draw_start_screen(255*(1-fade_progress));

            if(fade_progress>=1){
                begin_animation();
            }
        }

        else{

            let fade_progress=constrain(
                (frameCount-button_fade_in_frame)/button_fade_in_frames,0,1);

            if(menu_from_black){
                background(255*fade_progress);
            }
            else{
                background(255);
            }

            draw_start_screen(255*fade_progress);
        }

        return;
    }

    if(reset_canvas){
        background(255);
        reset_canvas=false;
    }

    if(!ending && music_finished()){
        start_ending();
    }

    if(ending){

        if(frameCount>=fade_start_frame){
            fade_out();
        }
    }

    else{

        check_heartbeat();
        update_snakes();
        update_rings();

        tip_pulse*=0.85;
    }
}


function music_time(){

    if(music!=null && music.isPlaying()){
        return music.currentTime();
    }

    return (millis()-animation_start_ms)/1000.0;
}


function music_finished(){

    if(music==null){
        return millis()-animation_start_ms>=47500;
    }

    return music_ended || music.currentTime()>=music.duration()-0.15;
}


function start_ending(){

    ending=true;
    fade_start_frame=frameCount+pause_frames;

    end_tips=[];

    for(let snake of snakes){
        end_tips.push([snake[0],snake[1],snake[4]*2.2]);
    }

    snakes=[];
    rings=[];
}


function fade_out(){

    let fade_progress=constrain(
        (frameCount-fade_start_frame)/fade_frames,0,1);

    let tip_progress=constrain(
        (frameCount-fade_start_frame)/60.0,0,1);

    noStroke();

    // gently fade the living tips
    fill(0,tip_progress*50);

    for(let tip of end_tips){
        circle(tip[0],tip[1],tip[2]);
    }

    // smoothly fade the entire canvas to black
    let remaining_frames=max(1,fade_frames-(frameCount-fade_start_frame)+1);

    fill(0,255.0/remaining_frames);
    rect(0,0,width,height);

    if(fade_progress>=1){
        background(0);
        end_tips=[];
        return_to_start(true);
    }
}


function check_heartbeat(){

    let time=music_time();

    while(heartbeat_index<heartbeat_times.length &&
        time>=heartbeat_times[heartbeat_index]){

        heartbeat();
        heartbeat_index++;
    }
}


function heartbeat(){

    tip_pulse=1;

    // first heartbeat
    if(snakes.length==0){
        create_ring(width/2,height/2,random(TWO_PI));
        return;
    }

    // all snakes beat together
    for(let snake of snakes.slice()){
        create_ring(snake[0],snake[1],snake[2]);
    }
}


function create_snake(x,y,angle,scene=1){

    if(scene==0 || snakes.length>=MAX_SNAKES){
        return;
    }

    let speed=random(s(3),s(5));
    let thickness=random(s(5),s(10));

    snakes.push([x,y,angle,speed,thickness]);
}


function update_snakes(){

    for(let snake of snakes){

        let x=snake[0];
        let y=snake[1];
        let angle=snake[2];
        let speed=snake[3]*SNAKE_SPEED_MULTIPLIER;
        let thickness=snake[4];

        let old_x=x;
        let old_y=y;

        // random movement
        angle+=random(-0.15,0.15);

        x+=cos(angle)*speed;
        y+=sin(angle)*speed;

        // bounce from edges
        if(x<0 || x>width){
            angle=PI-angle;
        }

        if(y<0 || y>height){
            angle=-angle;
        }

        x=constrain(x,0,width);
        y=constrain(y,0,height);

        // permanent trail
        stroke(0);
        strokeWeight(thickness);
        line(old_x,old_y,x,y);

        // living tip
        let flicker=0.95+0.05*sin(frameCount*0.3+x*0.02/scale_factor);

        let tip_size=thickness*(1.65+0.3*tip_pulse)*flicker;

        noStroke();

        // soft outer glow
        fill(185,20,45,50+90*tip_pulse);
        circle(x,y,tip_size);

        // warm inner light
        fill(240,65,85,170+85*tip_pulse);
        circle(x,y,tip_size*0.55);

        // bright center
        fill(255,190,195);
        circle(x,y,tip_size*0.2);

        snake[0]=x;
        snake[1]=y;
        snake[2]=angle;
    }
}


function create_ring(x,y,parent_angle){

    let diam=s(2);
    let max_diam=random(s(40),s(70));

    let child_angle=parent_angle+random(-PI/2,PI/2);

    let child_created=false;
    let ralpha=180;

    rings.push([x,y,diam,max_diam,child_angle,child_created,ralpha]);
}


function update_rings(){

    for(let i=rings.length-1;i>=0;i--){

        let ring=rings[i];

        let x=ring[0];
        let y=ring[1];
        let diam=ring[2];
        let max_diam=ring[3];
        let child_angle=ring[4];
        let child_created=ring[5];
        let ralpha=ring[6];

        fill(0,ralpha*0.08);

        stroke(55,0,0,ralpha);

        strokeWeight(
            map(diam,s(2),max_diam,s(4),max(s(0.5),0.3))
        );

        circle(x,y,diam);

        // create new snake when ring appears
        if(!child_created){

            let new_x=x+cos(child_angle)*(diam/2);
            let new_y=y+sin(child_angle)*(diam/2);

            create_snake(new_x,new_y,child_angle);

            ring[5]=true;
        }

        ring[2]+=s(2);
        ring[6]-=6;

        if(ring[2]>=max_diam || ring[6]<=0){
            rings.splice(i,1);
        }
    }
}



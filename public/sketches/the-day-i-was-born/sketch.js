let SOUND_ON=true;


let spores=[];
let branches=[];

let merged_points=[];

let scene=0;

let merged_x=0;
let merged_y=0;
let merged_radius=0;
let merged_frame=0;
let merge_frame=0;

let started=false;
let starting=false;

let start_frame=0;
let animation_frame=0;
let animation_start_ms=0;

// The documentation was recorded at 2304 x 1440. Keep the same
// proportions and movement speed when the embedded canvas is smaller.
function artwork_scale(){
    return min(width/2304,height/1440);
}

function detail_scale(){
    return min(width/1920,height/1080);
}

let scene_fade_frames=30;

let button_fade_in_frame=0;
let button_fade_in_frames=30;

let music=null;
let click_sound=null;

let active_click_sound=null;


function preload(){
    
    if(SOUND_ON){
        soundFormats("wav");
        
        music=loadSound("/artwork/digital-art/creative-coding/animation/the-day-i-was-born/background_music.wav", undefined, () => { music = null; });
        click_sound=loadSound("/artwork/digital-art/creative-coding/animation/the-day-i-was-born/click_sound.wav", undefined, () => { click_sound = null; });
    }
}


function setup(){
    
    createCanvas(windowWidth,windowHeight);
    
    stroke(255);
    frameRate(30);
    
    button_fade_in_frame=frameCount;
    
    merged_radius=min(width/5,height/5);
    
    if(SOUND_ON){
        if (music) music.setVolume(1);
        if (click_sound) click_sound.setVolume(1);
        
        if (click_sound) click_sound.onended(function(){
            
            if(starting){
                begin_animation();
            }
        });
    }
}


function windowResized(){
    
    resizeCanvas(windowWidth,windowHeight);
    
    merged_radius=min(width/5,height/5);
}


function play_click_sound(){
    
    if(click_sound==null){
        return;
    }
    
    click_sound.stop();
    click_sound.play();
    
    active_click_sound=click_sound;
}


function stop_sounds(){
    
    if(music!=null){
        music.stop();
    }
    
    if(click_sound!=null){
        click_sound.stop();
    }
}


function reset_animation(){
    
    spores=[];
    branches=[];
    merged_points=[];
    
    scene=0;
    
    merged_x=0;
    merged_y=0;
    merged_frame=0;
    merge_frame=0;
    
    let radius=min(width/20,height/20);
    let diam=radius*2;
    
    let spore1_duration=floor(random(115,140));
    let x1=width*0.15;
    let y1=floor(random(diam*2,height-diam*2+1));
    
    let spore2_duration=floor(random(115,140));
    let x2=width*0.85;
    let y2=floor(random(diam*2,height-diam*2+1));
    
    let target_angle1=atan2(y2-y1,x2-x1);
    let target_angle2=(target_angle1+PI)%TWO_PI;
    
    let spore1=[
        x1,
        y1,
        diam,
        [255,215,120,255],
        spore1_duration,
        target_angle1
    ];
    
    let spore2=[
        x2,
        y2,
        diam,
        [255,235,180,255],
        spore2_duration,
        target_angle2
    ];
    
    spores.push(spore1);
    spores.push(spore2);
    
    let how_many_random_spores=15;
    
    for(let i=0;i<how_many_random_spores;i++){
        
        // Keep a visible range of sizes, while every stray spore stays
        // substantially smaller than the two protagonists.
        let random_radius=random(8,25)*min(width/1920,height/1080);
        let random_diam=random_radius*2;
        
        let random_x=floor(random(random_radius,width-random_radius+1));
        let random_y=floor(random(random_radius,height-random_radius+1));
        
        let random_duration=floor(random(115,140));
        
        spores.push([
            random_x,
            random_y,
            random_diam,
            [150,150,150,150],
            random_duration,
            999
        ]);
    }
    
    for(let spore of spores){
        
        let r=spore[2]/2;
        
        let first_dir=random(1)<0.5 ? 10 : -10;
        let second_dir=-1*first_dir;
        
        spore.push([first_dir,second_dir]);
        spore.push([]);
        
        // points inside spores
        for(let i=0;i<floor(spore[2]*2);i++){
            
            let px=random(-r,r);
            let py=random(-r,r);
            
            while(dist(px,py,0,0)>r){
                px=random(-r,r);
                py=random(-r,r);
            }
            
            let vx=random(-1.5,1.5)*artwork_scale();
            let vy=random(-1.5,1.5)*artwork_scale();
            
            let base_r=spore[3][0];
            let base_g=spore[3][1];
            let base_b=spore[3][2];
            let base_a=spore[3][3];
            
            let point_r=constrain(base_r+random(-25,25),0,255);
            let point_g=constrain(base_g+random(-25,25),0,255);
            let point_b=constrain(base_b+random(-25,25),0,255);
            let point_a=constrain(base_a+random(-25,25),0,255);
            
            spore[7].push([
                px,
                py,
                vx,
                vy,
                point_r,
                point_g,
                point_b,
                point_a
            ]);
        }
    }
}


function draw_start_screen(alpha_value=255){
    
    let button_w=width*0.4;
    let button_h=height*0.2;
    
    let button_x=width/2;
    let button_y=height/2;
    
    let hovering=
        mouseX>button_x-button_w/2 &&
        mouseX<button_x+button_w/2 &&
        mouseY>button_y-button_h/2 &&
        mouseY<button_y+button_h/2;
    
    rectMode(CENTER);
    
    stroke(255,alpha_value);
    strokeWeight(1);
    
    if(hovering){
        fill(255,alpha_value);
    }
    
    else{
        fill(0,alpha_value);
    }
    
    rect(
        button_x,
        button_y,
        button_w,
        button_h,
        120
    );
    
    noStroke();
    
    if(hovering){
        fill(0,alpha_value);
    }
    
    else{
        fill(255,alpha_value);
    }
    
    textAlign(CENTER,CENTER);
    textSize(min(button_w,button_h)/5);
    
    text(
        "START ANIMATION",
        button_x,
        button_y
    );
    
    rectMode(CORNER);
}


function mousePressed(){
    
    if(!started && !starting){
        
        let button_w=width*0.4;
        let button_h=height*0.2;
        
        let button_x=width/2;
        let button_y=height/2;
        
        if(
            mouseX>button_x-button_w/2 &&
            mouseX<button_x+button_w/2 &&
            mouseY>button_y-button_h/2 &&
            mouseY<button_y+button_h/2
        ){
            
            userStartAudio();
            
            reset_animation();
            
            play_click_sound();
            
            starting=true;
            
            return false;
        }
    }
}


function begin_animation(){
    
    if(music!=null){
        
        music.stop();
        music.play();
    }
    
    start_frame=frameCount;
    animation_start_ms=millis();
    animation_frame=0;
    
    started=true;
    starting=false;
}


function keyPressed(){
    
    if(key=="r" || key=="R"){
        
        started=false;
        starting=false;
        active_click_sound=null;
        
        button_fade_in_frame=frameCount;
        
        if(music!=null){
            music.stop();
        }
        
        if(click_sound!=null){
            click_sound.stop();
        }
    }
    
    else if(key=="q" || key=="Q"){
        
        stop_sounds();
        noLoop();
    }
    
    else if(keyCode===ESCAPE){
        
        stop_sounds();
        noLoop();
    }
}


function draw(){
    
    background(0);
    
    if(!started){
        
        if(starting){
            
            if(active_click_sound!=null){
                
                let click_length=active_click_sound.duration();
                let click_position=active_click_sound.currentTime();
                
                let fade_length=min(click_length,2);
                
                let fade_progress=0;
                
                if(fade_length>0){
                    fade_progress=constrain(
                        click_position/fade_length,
                        0,
                        1
                    );
                }
                
                let button_alpha=255*(1-fade_progress);
                
                draw_start_screen(button_alpha);
            }
            
            else{
                begin_animation();
            }
        }
        
        else{
            
            let fade_progress=constrain(
                (frameCount-button_fade_in_frame)/float_value(button_fade_in_frames),
                0,
                1
            );
            
            let button_alpha=255*fade_progress;
            
            draw_start_screen(button_alpha);
        }
        
        return;
    }
    
    animation_frame=frameCount-start_frame;
    
    
    // SCENE 0
    // spores fall and mycelium grows
    
    if(scene==0){
        
        for(let spore of spores){
            draw_spore(spore);
        }
        
        if(animation_frame==150){
            
            for(let spore of spores){
                
                let special=spore===spores[0] || spore===spores[1];
                let how_many_branches=special ? floor(random(4,7)) : floor(random(2,5));
                
                for(let i=0;i<how_many_branches;i++){
                    
                    let target_x;
                    let target_y;
                    
                    if(spore===spores[0]){
                        
                        target_x=spores[1][0];
                        target_y=spores[1][1];
                    }
                    
                    else if(spore===spores[1]){
                        
                        target_x=spores[0][0];
                        target_y=spores[0][1];
                    }
                    
                    else{
                        
                        let angle=random(TWO_PI);
                        let target_distance=random(500,1000)*artwork_scale();
                        
                        target_x=
                            spore[0]+
                            cos(angle)*target_distance;
                        
                        target_y=
                            spore[1]+
                            sin(angle)*target_distance;
                    }
                    
                    create_branch(
                        spore[0],
                        spore[1],
                        spore[3],
                        target_x,
                        target_y,
                        10*artwork_scale(),
                        special ? spores[0][2]/2 : 0,
                        i%2===0 ? 1 : -1
                    );
                }
            }
        }
        
        if(animation_frame<800){
            grow_branches();
        }
        
        else{
            retract_branches();
        }
        
        draw_branches();
        
        if(
            animation_frame>=800 &&
            branches.length==0
        ){
            scene=1;
        }
    }
    
    
    // SCENE 1
    // special spores move while random spores fade
    
    else if(scene==1){
        
        move_special_spores();
        
        for(let i=2;i<spores.length;i++){
            
            let spore=spores[i];
            
            spore[3][3]=max(
                0,
                spore[3][3]-2
            );
            
            for(let p of spore[7]){
                p[7]=max(
                    0,
                    p[7]-2
                );
            }
        }
        
        for(let spore of spores){
            draw_spore(spore);
        }
    }
    
    
    // SCENE 2
    // special spores blow toward each other and merge
    
    else if(scene==2){
        
        for(let spore of spores){
            draw_spore(spore,true);
        }
        
        if(all_spores_merged()){
            
            create_merged_spore();
            
            spores=[];
            
            merged_frame=animation_frame;
            
            scene=3;
        }
    }
    
    
    // SCENE 3
    // merged spore lives for a moment
    
    else if(scene==3){
        
        draw_merged_spore();
        
        // The soundtrack falls nearly silent at 60 seconds. Let the
        // merged spore hold until then so its release lands in that pause.
        let soundtrack_time=music && music.isPlaying()
            ? music.currentTime()
            : (millis()-animation_start_ms)/1000;
        if(animation_frame-merged_frame>=45 && soundtrack_time>=60){
            
            prepare_merged_explosion();
            
            scene=4;
        }
    }
    
    
    // SCENE 4
    // merged spore explodes everywhere
    
    else if(scene==4){
        
        draw_merged_spore(true);
        
        if(merged_particles_gone() && (music==null || !music.isPlaying())){
            
            button_fade_in_frame=frameCount;
            
            started=false;
        }
    }
}


function float_value(value){
    return Number(value);
}


function change(start,stop,duration,offset=0){
    
    return map(
        (animation_frame+offset)%max(duration,1),
        0,
        duration,
        start,
        stop
    );
}


function change_once(start,stop,duration){
    
    let progress=min(
        animation_frame,
        duration
    );
    
    return map(
        progress,
        0,
        duration,
        start,
        stop
    );
}


function change_once_smooth(start,stop,duration){
    
    let progress=min(
        animation_frame/float_value(duration),
        1
    );
    
    let smooth_progress=
        progress*
        progress*
        (3-2*progress);
    
    return lerp(
        start,
        stop,
        smooth_progress
    );
}


function swing(start,stop,duration,offset=0){
    
    let position=
        -cos(
            2*PI*
            change(
                0,
                1,
                duration*2,
                offset
            )
        )*.5+.5;
    
    return (
        position*
        (stop-start)
    )+start;
}


function draw_spore(spore,merging=false){
    
    let cx=spore[0];
    let cy=spore[1];
    let diam=spore[2];
    let spore_color=spore[3];
    let duration=spore[4];
    
    let first_dir=spore[6][0];
    let second_dir=spore[6][1];
    
    let points_inside=spore[7];
    
    let initial_height=-(diam/2);
    
    let y=change_once_smooth(
        initial_height,
        cy,
        duration
    );
    
    let progress=min(
        animation_frame/float_value(duration),
        1
    );
    
    let smooth_progress=
        progress*
        progress*
        (3-2*progress);
    
    let swinging_x=swing(
        cx+first_dir,
        cx+second_dir,
        duration/5
    );
    
    let x=lerp(
        swinging_x,
        cx,
        smooth_progress
    );
    
    let r=diam/2;
    
    let is_special=
        spore_color[0]!=150 ||
        spore_color[1]!=150 ||
        spore_color[2]!=150;
    
    let scene_alpha=1;
    
    if(scene==0){
        
        scene_alpha=constrain(
            animation_frame/
            float_value(scene_fade_frames),
            0,
            1
        );
    }
    
    let halo_progress=1;
    
    if(merging && is_special){
        
        halo_progress=constrain(
            1-
            (animation_frame-merge_frame)/
            30.0,
            0,
            1
        );
    }
    
    if(!merging || is_special){
        
        noStroke();
        
        fill(
            spore_color[0],
            spore_color[1],
            spore_color[2],
            spore_color[3]*
            0.07*
            halo_progress*
            scene_alpha
        );
        
        circle(
            x,
            y,
            diam*2.2
        );
        
        fill(
            spore_color[0],
            spore_color[1],
            spore_color[2],
            spore_color[3]*
            0.12*
            halo_progress*
            scene_alpha
        );
        
        circle(
            x,
            y,
            diam*1.7
        );
        
        fill(
            spore_color[0],
            spore_color[1],
            spore_color[2],
            spore_color[3]*
            0.18*
            halo_progress*
            scene_alpha
        );
        
        circle(
            x,
            y,
            diam*1.25
        );
        
        noFill();
    }
    
    for(let p of points_inside){
        
        let px=p[0];
        let py=p[1];
        let vx=p[2];
        let vy=p[3];
        
        let point_r=p[4];
        let point_g=p[5];
        let point_b=p[6];
        let point_a=p[7];
        
        if(merging){
            
            let target_x=p[8];
            let target_y=p[9];
            let settled=p[10];
            
            if(!settled){
                
                let distance_to_target=
                    dist(
                        px,
                        py,
                        target_x,
                        target_y
                    );
                
                if(distance_to_target>2){
                    
                    let target_angle=
                        atan2(
                            target_y-py,
                            target_x-px
                        );
                    
                    let target_speed=
                        constrain(
                            distance_to_target*
                            0.05,
                            0.5*artwork_scale(),
                            4*artwork_scale()
                        );
                    
                    let target_vx=
                        cos(target_angle)*
                        target_speed;
                    
                    let target_vy=
                        sin(target_angle)*
                        target_speed;
                    
                    vx=lerp(
                        vx,
                        target_vx,
                        0.08
                    );
                    
                    vy=lerp(
                        vy,
                        target_vy,
                        0.08
                    );
                    
                    vx+=random(
                        -0.03,
                        0.03
                    );
                    
                    vy+=random(
                        -0.03,
                        0.03
                    );
                    
                    px+=vx;
                    py+=vy;
                }
                
                else{
                    
                    px=target_x;
                    py=target_y;
                    
                    vx=0;
                    vy=0;
                    
                    p[10]=true;
                }
            }
        }
        
        else{
            
            px+=vx;
            py+=vy;
            
            let distance_from_center=
                dist(
                    px,
                    py,
                    0,
                    0
                );
            
            if(distance_from_center>=r){
                
                px-=vx;
                py-=vy;
                
                vx*=-1;
                vy*=-1;
            }
        }
        
        p[0]=px;
        p[1]=py;
        p[2]=vx;
        p[3]=vy;
        
        if(is_special){
            
            stroke(
                point_r,
                point_g,
                point_b,
                point_a*
                0.2*
                scene_alpha
            );
            
            strokeWeight(max(1,6*detail_scale()));
            
            point(
                x+px,
                y+py
            );
            
            stroke(
                point_r,
                point_g,
                point_b,
                point_a*
                scene_alpha
            );
            
            strokeWeight(max(0.75,2*detail_scale()));
            
            point(
                x+px,
                y+py
            );
        }
        
        else{
            
            stroke(
                point_r,
                point_g,
                point_b,
                point_a*
                0.12*
                scene_alpha
            );
            
            strokeWeight(max(1,4*detail_scale()));
            
            point(
                x+px,
                y+py
            );
            
            stroke(
                point_r,
                point_g,
                point_b,
                point_a*
                scene_alpha
            );
            
            strokeWeight(max(0.75,2*detail_scale()));
            
            point(
                x+px,
                y+py
            );
        }
    }
}


function create_branch(
    x,
    y,
    branch_color,
    target_x,
    target_y,
    step_size=10*artwork_scale(),
    target_radius=0,
    orbit_direction=1
){
    
    let angle=
        atan2(
            target_y-y,
            target_x-x
        );
    if(target_radius) angle+=random(-0.35,0.35);
    
    let life=0;
    
    let distance_to_target=
        dist(
            x,
            y,
            target_x,
            target_y
        );
    
    let max_life=
        floor(
            (
                distance_to_target/
                float_value(step_size)
            )*
            random(1.2,1.6)
        );
    
    if(target_radius){
        max_life+=floor(TWO_PI*target_radius*1.5/step_size);
    }

    let thickness=random(1,2)*detail_scale();
    
    branches.push([
        [[x,y]],
        step_size,
        angle,
        life,
        max_life,
        thickness,
        branch_color,
        target_x,
        target_y,
        target_radius,
        orbit_direction,
        target_radius ? random(1.3,1.9) : 0,
        random(TWO_PI),
        random(1000),
        random(0.9,1.5),
        0, // generation: original strand
        floor(random(25,45)), // first fork along the route
        0 // forks produced by this strand
    ]);
}


function grow_branches(){
    
    let new_branches=[];
    
    for(let branch of branches){
        
        let points=branch[0];
        
        let step_size=branch[1];
        let angle=branch[2];
        let life=branch[3];
        let max_life=branch[4];
        
        if(life>=max_life){
            continue;
        }
        
        let thickness=branch[5];
        let branch_color=branch[6];
        let target_x=branch[7];
        let target_y=branch[8];
        let target_radius=branch[9];
        let orbit_direction=branch[10];
        let orbit_size=branch[11];
        let sway_phase=branch[12];
        let wander_seed=branch[13];
        let wander_strength=branch[14];
        let generation=branch[15];
        
        let x=points[points.length-1][0];
        let y=points[points.length-1][1];
        
        let distance_to_target=dist(x,y,target_x,target_y);
        let target_angle=atan2(target_y-y,target_x-x);
        if(target_radius && distance_to_target>=target_radius*3.5){
            // Each branch follows its own slowly drifting bearing. The
            // target still pulls it back, but the route is never straight.
            target_angle+=(noise(wander_seed,life*0.018)-0.5)*wander_strength;
            target_angle+=(noise(wander_seed+100,life*0.06)-0.5)*0.45;
        }
        if(target_radius && distance_to_target<target_radius*3.5){
            let radial_angle=atan2(y-target_y,x-target_x);
            let desired_radius=target_radius*orbit_size;
            let radial_pull=constrain(
                (distance_to_target-desired_radius)/desired_radius,
                -0.8,
                0.8
            );
            // Suggest a loose orbit; keep the original wandering growth.
            target_angle=radial_angle+orbit_direction*(HALF_PI+radial_pull*0.75);
        }
        
        let angle_difference=
            target_angle-angle;
        
        if(angle_difference>PI){
            angle_difference-=TWO_PI;
        }
        
        if(angle_difference<-PI){
            angle_difference+=TWO_PI;
        }
        
        let steering=target_radius && generation>0 && life<35 ? 0.025 :
            target_radius ? 0.065 : 0.055;
        angle+=angle_difference*steering;
        
        angle+=sin(life*0.075+sway_phase)*0.05+random(-0.07,0.07);
        
        let new_x=
            x+
            cos(angle)*
            step_size;
        
        let new_y=
            y+
            sin(angle)*
            step_size;

        branch[0].push([
            new_x,
            new_y
        ]);
        
        branch[2]=angle;
        branch[3]+=1;
        
        let crossing=target_radius && distance_to_target>target_radius*4;
        let should_fork=crossing && generation<2 &&
            branch[17]<(generation===0 ? 2 : 1) && life>=branch[16];
        let stray_fork=!target_radius && life>10 && random(1)<0.0015;
        if(branches.length+new_branches.length<120 && (should_fork || stray_fork)){
            
            let new_angle=
                angle+
                (random(1)<0.5 ? -1 : 1)*random(0.65,1.15);

            branch[17]+=1;
            branch[16]=life+floor(random(55,90));
            
            new_branches.push([
                [[new_x,new_y]],
                step_size,
                new_angle,
                0,
                floor((target_radius ? distance_to_target/step_size : max_life)*random(1.1,1.4)),
                thickness*0.72,
                branch_color,
                target_x,
                target_y,
                target_radius,
                orbit_direction,
                orbit_size,
                random(TWO_PI),
                random(1000),
                random(0.9,1.5),
                generation+1,
                floor(random(30,55)),
                0
            ]);
        }
    }
    
    branches=
        branches.concat(
            new_branches
        );
}


function retract_branches(){
    
    for(
        let i=branches.length-1;
        i>=0;
        i--
    ){
        
        let branch=branches[i];
        let segments=branch[0];
        
        if(segments.length>1){
            segments.pop();
        }
        
        else{
            branches.splice(i,1);
        }
    }
}


function draw_branches(){
    
    strokeCap(SQUARE);
    
    for(let branch of branches){
        
        let segments=branch[0];
        let thickness=branch[5];
        let branch_color=branch[6];
        
        stroke(
            branch_color[0],
            branch_color[1],
            branch_color[2],
            branch_color[3]
        );
        
        strokeWeight(max(0.5,thickness));
        
        noFill();
        beginShape();
        for(let segment of segments){
            vertex(segment[0],segment[1]);
        }
        endShape();
    }
    
    strokeCap(ROUND);
    
    for(let branch of branches){
        
        let segments=branch[0];
        let life=branch[3];
        let max_life=branch[4];
        let thickness=branch[5];
        let branch_color=branch[6];
        
        if(
            life<max_life &&
            segments.length>0
        ){
            
            let tip=
                segments[
                    segments.length-1
                ];
            
            stroke(
                branch_color[0],
                branch_color[1],
                branch_color[2],
                branch_color[3]
            );
            
            strokeWeight(
                max(1,thickness*3)
            );
            
            point(
                tip[0],
                tip[1]
            );
        }
    }
}


function move_special_spores(){
    
    let target_x1=width*0.15;
    let target_x2=width*0.85;
    let target_y=height/2;
    
    spores[0][0]=lerp(
        spores[0][0],
        target_x1,
        0.03
    );
    
    spores[0][1]=lerp(
        spores[0][1],
        target_y,
        0.03
    );
    
    spores[1][0]=lerp(
        spores[1][0],
        target_x2,
        0.03
    );
    
    spores[1][1]=lerp(
        spores[1][1],
        target_y,
        0.03
    );
    
    let distance1=
        dist(
            spores[0][0],
            spores[0][1],
            target_x1,
            target_y
        );
    
    let distance2=
        dist(
            spores[1][0],
            spores[1][1],
            target_x2,
            target_y
        );
    
    if(
        distance1<1 &&
        distance2<1
    ){
        
        spores[0][0]=target_x1;
        spores[0][1]=target_y;
        
        spores[1][0]=target_x2;
        spores[1][1]=target_y;
        
        spores=spores.slice(0,2);
        
        prepare_spores_to_merge();
        
        merge_frame=
            animation_frame;
        
        scene=2;
    }
}


function prepare_spores_to_merge(){
    
    merged_x=
        (
            spores[0][0]+
            spores[1][0]
        )/2;
    
    merged_y=
        (
            spores[0][1]+
            spores[1][1]
        )/2;
    
    for(let spore of spores){
        
        for(let p of spore[7]){
            
            let target_angle=
                random(TWO_PI);
            
            let target_distance=
                sqrt(random(1))*
                merged_radius;
            
            let target_global_x=
                merged_x+
                cos(target_angle)*
                target_distance;
            
            let target_global_y=
                merged_y+
                sin(target_angle)*
                target_distance;
            
            let target_x=
                target_global_x-
                spore[0];
            
            let target_y=
                target_global_y-
                spore[1];
            
            let angle_to_target=
                atan2(
                    target_y-p[1],
                    target_x-p[0]
                );
            
            let speed=
                random(2,5)*artwork_scale();
            
            p[2]=
                cos(angle_to_target)*
                speed;
            
            p[3]=
                sin(angle_to_target)*
                speed;
            
            p.push(target_x);
            p.push(target_y);
            p.push(false);
        }
    }
}


function all_spores_merged(){
    
    for(let spore of spores){
        
        for(let p of spore[7]){
            
            if(!p[10]){
                return false;
            }
        }
    }
    
    return true;
}


function create_merged_spore(){
    
    merged_points=[];
    
    for(let spore of spores){
        
        for(let p of spore[7]){
            
            let global_x=
                spore[0]+p[0];
            
            let global_y=
                spore[1]+p[1];
            
            let px=
                global_x-
                merged_x;
            
            let py=
                global_y-
                merged_y;
            
            let vx=
                random(
                    -0.8,
                    0.8
                );
            
            let vy=
                random(
                    -0.8,
                    0.8
                );
            
            let point_r=p[4];
            let point_g=p[5];
            let point_b=p[6];
            let point_a=p[7];
            
            merged_points.push([
                px,
                py,
                vx,
                vy,
                point_r,
                point_g,
                point_b,
                point_a
            ]);
        }
    }
}


function draw_merged_spore(exploding=false){
    
    if(!exploding){
        
        let halo_progress=
            constrain(
                (
                    animation_frame-
                    merged_frame
                )/30.0,
                0,
                1
            );
        
        noStroke();
        
        
        // This color is the exact 50/50 mixture
        // of the two special spore colors:
        // [255,215,120] and [255,235,180]
        // = [255,225,150]
        
        fill(
            255,
            225,
            150,
            18*halo_progress
        );
        
        circle(
            merged_x,
            merged_y,
            merged_radius*4
        );
        
        fill(
            255,
            225,
            150,
            30*halo_progress
        );
        
        circle(
            merged_x,
            merged_y,
            merged_radius*3
        );
        
        fill(
            255,
            225,
            150,
            45*halo_progress
        );
        
        circle(
            merged_x,
            merged_y,
            merged_radius*2.3
        );
        
        noFill();
    }
    
    for(let p of merged_points){
        
        let px=p[0];
        let py=p[1];
        let vx=p[2];
        let vy=p[3];
        
        let point_r=p[4];
        let point_g=p[5];
        let point_b=p[6];
        let point_a=p[7];
        
        if(exploding){
            
            px+=vx;
            py+=vy;
            
            vx*=1.005;
            vy*=1.005;
            
            vx+=random(
                -0.02,
                0.02
            );
            
            vy+=random(
                -0.02,
                0.02
            );
        }
        
        else{
            
            px+=vx;
            py+=vy;
            
            let distance_from_center=
                dist(
                    px,
                    py,
                    0,
                    0
                );
            
            if(
                distance_from_center>=
                merged_radius
            ){
                
                px-=vx;
                py-=vy;
                
                vx*=-1;
                vy*=-1;
            }
        }
        
        p[0]=px;
        p[1]=py;
        p[2]=vx;
        p[3]=vy;
        
        stroke(
            point_r,
            point_g,
            point_b,
            point_a*0.2
        );
        
        strokeWeight(max(1,7*detail_scale()));
        
        point(
            merged_x+px,
            merged_y+py
        );
        
        stroke(
            point_r,
            point_g,
            point_b,
            point_a
        );
        
        strokeWeight(max(0.75,2*detail_scale()));
        
        point(
            merged_x+px,
            merged_y+py
        );
    }
}


function prepare_merged_explosion(){
    
    for(let p of merged_points){
        
        let px=p[0];
        let py=p[1];
        
        let angle;
        
        if(
            dist(
                px,
                py,
                0,
                0
            )<2
        ){
            angle=random(TWO_PI);
        }
        
        else{
            angle=atan2(py,px);
        }
        
        angle+=random(
            -0.35,
            0.35
        );
        
        let speed=
            random(4,10)*artwork_scale();
        
        p[2]=
            cos(angle)*
            speed;
        
        p[3]=
            sin(angle)*
            speed;
    }
}


function merged_particles_gone(){
    
    for(let p of merged_points){
        
        let x=
            merged_x+
            p[0];
        
        let y=
            merged_y+
            p[1];
        
        if(
            x>-100 &&
            x<width+100 &&
            y>-100 &&
            y<height+100
        ){
            return false;
        }
    }
    
    return true;
}

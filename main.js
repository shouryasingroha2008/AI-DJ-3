song="";
leftWristX="";
leftWristY="";

rightWristX="";
rightWristY="";

leftWristScore=0;

function preload(){
    song=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('poses',gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is Initialized!");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftWristScore=results[0].pose.keypoints[9].score;
        console.log("left Wrist Score= "+leftWristScore);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristy=results[0].pose.leftWrist.y;
        console.log("left wrist x= "+leftWristX+" and left wrist Y= "+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("right wrist x= "+rightWristX+" right wrist y="+rightWristY);
    }
}

function draw(){
    image(video,0,0,600,500);

    fill("#ff0000");
    stroke("#ff0000");

    if(leftWristScore>0.2){
    circle(leftWristX,leftWristY,20);
    inNumberLeftWristY=Number(leftWristY);
    remove_decimal=floor(inNumberLeftWristY);
    volume=remove_decimal/500;
    song.setVolume(volume);
    document.getElementById('volume').innerHTML="volume: "+volume;
    };
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
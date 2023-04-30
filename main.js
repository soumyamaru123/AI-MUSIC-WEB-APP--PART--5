song1 = "";
song2 = "";

song_1_status = "";
song_2_status = "";

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

leftWristScore=0;
rightWristScore=0;

noseX="";
noseY="";

function preload() {
    song1 = loadSound("song1.mp3");
    song2 = loadSound("Song2.mp3");
    headphones=loadImage('https://i.postimg.cc/Kj57zDNd/image.png');
}

function setup(){
    video = createCapture(VIDEO);
    video.hide();
  
    canvas =  createCanvas(600, 500);
	canvas.center();

   posenet = ml5.poseNet(video,modelLoaded);
   posenet.on('pose',gotPoses);
}

function draw() {
    image(video, 0, 100, 600, 500);
    image(headphones, noseX, noseY, 220, 200);

    song_1_Status=song1.isPlaying();
    song_2_Status=song2.isPlaying();

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    fill("#ff0000");
    stroke("#ff0000"); 

    if(leftWristScore > 0.2){
        circle(leftWristX, leftWristY, 20);
        song2.stop();
    
    if(song_1_Status == false){
        song1.play();
        document.getElementById("song_name").innerHTML="Harry Potter Theme Song";
    }}
    if(rightWristScore > 0.2){
        circle(rightWristX, rightWristY, 20);
        song1.stop();

        if(song_2_Status == false){
            song2.play();
            document.getElementById("song_name").innerHTML="Peter Pan Song";
        }
    }



}


function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function gotPoses(results){
    if (results.length > 0){
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("Left wrist Y = "+leftWristY+ "left wrist X = "+leftWristX);
       
        leftWristScore=results[0].pose.keypoints[9].score;
        rightWristScore=results[0].pose.keypoints[10].score;

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("Right wrist Y = "+rightWristY+ "right wrist X = "+rightWristX)

        noseX=results[0].pose.nose.x-130;
        noseY=results[0].pose.nose.y-170;
        console.log("noseX= "+ noseX);
        console.log("noseY= "+ noseY);

    }
}
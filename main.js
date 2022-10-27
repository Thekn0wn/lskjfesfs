song1 = "";
song2 = "";
leftWristX = "";
leftWristY = "";

rightWristX = "";
rightWristY = "";

scoreLeftWrist = "";
scoreRightWrist = "";

var songStatus = "";
var songStatus2 = "";

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet is Initialized');
}


function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");

    songStatus = song1.isPlaying();
    songStatus2 = song2.isPlaying();

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);

        song2.stop();

        if (songStatus === false) {
            song1.play();
            document.getElementById("songName") = "Song Name: Harry Potter Theme Song";
        }
    }

    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);

        song21.stop();

        if (songStatus2 === false) {
            song2.play();
            document.getElementById("songName") = "Song Name: Peter Pan Song";
        }
    }
}



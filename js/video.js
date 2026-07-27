// ==========================================
// CanSat Ground Control Station
// video.js
// ==========================================

// ------------------------------------------
// Variables
// ------------------------------------------

let cameraStream = null;

const video = document.getElementById("camera");


// ==========================================
// Update Camera Status
// ==========================================

function setCameraStatus(text, online) {

    const status = document.getElementById("camera-status");

    if (!status) return;

    status.textContent = text;

    status.className = online
        ? "status-indicator online"
        : "status-indicator offline";

}


// ==========================================
// Start Camera
// ==========================================

async function startCamera() {

    if (!navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia) {

        updateStatus("Camera Not Supported");

        return;

    }

    try {

        cameraStream = await navigator.mediaDevices.getUserMedia({

            video: {

                width: 1280,

                height: 720,

                facingMode: "environment"

            },

            audio: false

        });

        video.srcObject = cameraStream;

        video.play();

        updateStatus("Camera Started");

        setCameraStatus("● ACTIVE", true);

    }

    catch (error) {

        console.error(error);

        updateStatus("Camera Permission Denied");

        setCameraStatus("● OFF", false);

    }

}


// ==========================================
// Stop Camera
// ==========================================

function stopCamera() {

    if (!cameraStream)
        return;

    cameraStream.getTracks().forEach(track => {

        track.stop();

    });

    video.pause();

    video.srcObject = null;

    cameraStream = null;

    updateStatus("Camera Stopped");

    setCameraStatus("● OFF", false);

}


// ==========================================
// Capture Snapshot
// ==========================================

function captureSnapshot() {

    if (!cameraStream) {

        alert("Camera is not running.");

        return;

    }

    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;

    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(

        video,

        0,

        0,

        canvas.width,

        canvas.height

    );

    const link = document.createElement("a");

    link.download =

        "CanSat_Snapshot_" +

        Date.now() +

        ".png";

    link.href = canvas.toDataURL("image/png");

    link.click();

}


// ==========================================
// Camera Button Events
// ==========================================

document
.getElementById("start-camera")
.addEventListener(

    "click",

    startCamera

);

document
.getElementById("stop-camera")
.addEventListener(

    "click",

    stopCamera

);


// ==========================================
// Auto Stop Camera
// ==========================================

window.addEventListener(

    "beforeunload",

    () => {

        stopCamera();

    }

);


// ==========================================
// Camera State
// ==========================================

function isCameraRunning() {

    return cameraStream !== null;

}


// ==========================================
// Console
// ==========================================

console.log("Video Module Loaded");

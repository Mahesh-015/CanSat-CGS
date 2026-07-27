// ==========================================
// CanSat Ground Control Station
// errors.js
// ==========================================

// ------------------------------------------
// Mission Status Variables
// ------------------------------------------

let gpsAvailable = true;

let payloadSeparated = false;

let parachuteActivated = false;


// ==========================================
// Update Error Code
// ==========================================

function updateErrorCode() {

    // --------------------------------------
    // Digit 1 : Descent Rate
    // --------------------------------------

    let d1 = (descentRate >= 8 && descentRate <= 10) ? 0 : 1;

    // --------------------------------------
    // Digit 2 : GPS
    // --------------------------------------

    let d2 = gpsAvailable ? 0 : 1;

    // --------------------------------------
    // Digit 3 : Payload Separation
    // --------------------------------------

    let d3 = payloadSeparated ? 0 : 1;

    // --------------------------------------
    // Digit 4 : Emergency Parachute
    // --------------------------------------

    let d4 = parachuteActivated ? 1 : 0;

    const digits = document.querySelectorAll(".digit");

    if (digits.length < 4)
        return;

    digits[0].textContent = d1;
    digits[1].textContent = d2;
    digits[2].textContent = d3;
    digits[3].textContent = d4;

    updateDigitColor(digits[0], d1);
    updateDigitColor(digits[1], d2);
    updateDigitColor(digits[2], d3);
    updateDigitColor(digits[3], d4);

    updateMissionStatus(d1, d2, d3, d4);

}


// ==========================================
// Digit Color
// ==========================================

function updateDigitColor(element, value) {

    if (!element)
        return;

    if (value === 0) {

        element.classList.remove("fault");

        element.classList.add("safe");

    }

    else {

        element.classList.remove("safe");

        element.classList.add("fault");

    }

}


// ==========================================
// Mission Status Message
// ==========================================

function updateMissionStatus(d1, d2, d3, d4) {

    const status = document.getElementById("command-status");

    if (!status)
        return;

    if (d1 === 0 &&
        d2 === 0 &&
        d3 === 0 &&
        d4 === 0) {

        status.textContent =
        "Mission Status : All Systems Normal";

        return;

    }

    let faults = [];

    if (d1 === 1)
        faults.push("Descent Rate");

    if (d2 === 1)
        faults.push("GPS");

    if (d3 === 1)
        faults.push("Payload");

    if (d4 === 1)
        faults.push("Parachute");

    status.textContent =
        "Fault : " + faults.join(", ");

}


// ==========================================
// Reset Error System
// ==========================================

function resetErrorSystem() {

    gpsAvailable = true;

    payloadSeparated = false;

    parachuteActivated = false;

    updateErrorCode();

}


// ==========================================
// Helper Functions
// ==========================================

function setGPSStatus(status) {

    gpsAvailable = status;

    updateErrorCode();

}

function setPayloadSeparated(status) {

    payloadSeparated = status;

    updateErrorCode();

}

function setParachuteStatus(status) {

    parachuteActivated = status;

    updateErrorCode();

}


// ==========================================
// Initialize
// ==========================================

window.addEventListener("load", () => {

    updateErrorCode();

});

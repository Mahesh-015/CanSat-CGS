// ==========================================
// CanSat Ground Control Station
// app.js
// ==========================================

// -----------------------------
// Telemetry Variables
// -----------------------------

let packetCount = 0;

let altitude = 500;
let temperature = 28;
let pressure = 1013;
let descentRate = 9;
let battery = 8.40;

let latitude = 12.971600;
let longitude = 77.594600;

let roll = 0;
let pitch = 0;
let yaw = 0;

// Mission Timer
let missionStartTime = Date.now();

// -----------------------------
// Simulation Loop
// -----------------------------

setInterval(() => {

    if (!telemetryRunning)
        return;

    //--------------------------------
    // Generate Dummy Telemetry
    //--------------------------------

    packetCount++;

    altitude -= Math.random() * 3;

    if (altitude < 0)
        altitude = 0;

    temperature += (Math.random() - 0.5) * 0.4;

    pressure += (Math.random() - 0.5) * 2;

    descentRate = 8 + Math.random() * 2;

    battery -= 0.002;

    if (battery < 6.5)
        battery = 6.5;

    latitude += 0.00005;

    longitude += 0.00005;

    roll += 2;

    pitch += 1;

    yaw += 3;

    //--------------------------------
    // Mission Time
    //--------------------------------

    const elapsed = Math.floor((Date.now() - missionStartTime) / 1000);

    const hrs = String(Math.floor(elapsed / 3600)).padStart(2, "0");
    const mins = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
    const secs = String(elapsed % 60).padStart(2, "0");

    //--------------------------------
    // Update Telemetry
    //--------------------------------

    document.getElementById("packet-count").textContent = packetCount;

    document.getElementById("mission-time").textContent =
        `${hrs}:${mins}:${secs}`;

    document.getElementById("altitude").textContent =
        altitude.toFixed(2) + " m";

    document.getElementById("temperature").textContent =
        temperature.toFixed(2) + " °C";

    document.getElementById("pressure").textContent =
        pressure.toFixed(2) + " hPa";

    document.getElementById("descent-rate").textContent =
        descentRate.toFixed(2) + " m/s";

    document.getElementById("battery").textContent =
        battery.toFixed(2) + " V";

    document.getElementById("latitude").textContent =
        latitude.toFixed(6);

    document.getElementById("longitude").textContent =
        longitude.toFixed(6);

    //--------------------------------
    // Payload Telemetry
    //--------------------------------

    const rollElement = document.getElementById("roll");
    if (rollElement)
        rollElement.textContent = roll.toFixed(1) + "°";

    const pitchElement = document.getElementById("pitch");
    if (pitchElement)
        pitchElement.textContent = pitch.toFixed(1) + "°";

    const yawElement = document.getElementById("yaw");
    if (yawElement)
        yawElement.textContent = yaw.toFixed(1) + "°";

    //--------------------------------
    // Battery Indicator
    //--------------------------------

    const batteryFill = document.getElementById("battery-fill");
    const batteryPercentText = document.getElementById("battery-percent");

    if (batteryFill && batteryPercentText) {

        let percent = ((battery - 6.5) / (8.4 - 6.5)) * 100;

        percent = Math.max(0, Math.min(100, percent));

        batteryFill.style.width = percent + "%";

        batteryPercentText.textContent =
            percent.toFixed(0) + "%";

        if (percent > 70)
            batteryFill.style.background = "#22C55E";
        else if (percent > 30)
            batteryFill.style.background = "#FACC15";
        else
            batteryFill.style.background = "#EF4444";
    }

    //--------------------------------
    // GPS Status
    //--------------------------------

    const gpsLock = document.getElementById("gps-lock");

    if (gpsLock)
        gpsLock.textContent =
            gpsAvailable ? "● LOCKED" : "● NO SIGNAL";

    //--------------------------------
    // Payload Status
    //--------------------------------

    const payloadState =
        document.getElementById("payload-state");

    if (payloadState)
        payloadState.textContent =
            payloadSeparated ?
            "● SEPARATED" :
            "● ATTACHED";

    //--------------------------------
    // Update Modules
    //--------------------------------

    if (typeof updateCharts === "function")
        updateCharts();

    if (typeof logTelemetry === "function")
        logTelemetry();

    if (typeof updateMap === "function")
        updateMap(latitude, longitude);

    if (typeof updateOrientation === "function")
        updateOrientation(roll, pitch, yaw);

    if (typeof updateErrorCode === "function")
        updateErrorCode();

}, 1000);


// ==========================================
// Chart Updates
// ==========================================

function updateCharts() {

    addData(altitudeChart, altitude);

    addData(temperatureChart, temperature);

    addData(pressureChart, pressure);

    addData(descentChart, descentRate);

    addData(batteryChart, battery);

}


// ==========================================
// Generic Chart Function
// ==========================================

function addData(chart, value) {

    if (!chart)
        return;

    chart.data.labels.push(packetCount);

    chart.data.datasets[0].data.push(value);

    if (chart.data.labels.length > 20) {

        chart.data.labels.shift();

        chart.data.datasets[0].data.shift();

    }

    chart.update();

}

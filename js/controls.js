// ==========================================
// CanSat Ground Control Station
// controls.js
// ==========================================

// ------------------------------------------
// Telemetry State
// ------------------------------------------

let telemetryRunning = true;

// ------------------------------------------
// Helper Function
// ------------------------------------------

function updateStatus(message) {

    document.getElementById("command-status").textContent = message;

}

// ------------------------------------------
// Start Telemetry
// ------------------------------------------

document.getElementById("start-btn").addEventListener("click", () => {

    telemetryRunning = true;

    updateStatus("Telemetry Started");

});

// ------------------------------------------
// Stop Telemetry
// ------------------------------------------

document.getElementById("stop-btn").addEventListener("click", () => {

    telemetryRunning = false;

    updateStatus("Telemetry Stopped");

});

// ------------------------------------------
// Reset Packet Counter
// ------------------------------------------

document.getElementById("reset-btn").addEventListener("click", () => {

    packetCount = 0;

    altitude = 500;
    temperature = 28;
    pressure = 1013;
    descentRate = 9;
    battery = 8.40;

    latitude = 12.971600;
    longitude = 77.594600;

    roll = 0;
    pitch = 0;
    yaw = 0;

    missionStartTime = Date.now();

    if (typeof telemetryLog !== "undefined") {

        telemetryLog = [];

    }

    if (typeof lastLoggedPacket !== "undefined") {

        lastLoggedPacket = -1;

    }

    // Clear Charts

    [

        altitudeChart,
        temperatureChart,
        pressureChart,
        descentChart,
        batteryChart

    ].forEach(chart => {

        chart.data.labels = [];

        chart.data.datasets[0].data = [];

        chart.update();

    });

    updateStatus("Mission Reset Successfully");

});

// ------------------------------------------
// Sync PC Time
// ------------------------------------------

document.getElementById("sync-btn").addEventListener("click", () => {

    missionStartTime = Date.now();

    updateStatus("Mission Timer Synchronized");

});

// ------------------------------------------
// Export CSV
// ------------------------------------------

document.getElementById("csv-btn").addEventListener("click", () => {

    if (typeof exportCSV === "function") {

        exportCSV();

        updateStatus("Telemetry CSV Exported");

    }

});

// ------------------------------------------
// Export Graphs
// ------------------------------------------

document.getElementById("graph-btn").addEventListener("click", () => {

    if (typeof exportGraphs === "function") {

        exportGraphs();

        updateStatus("Graphs Exported");

    }

});

// ------------------------------------------
// Manual Separation
// ------------------------------------------

const separationBtn = document.getElementById("separation-btn");

if (separationBtn) {

    separationBtn.addEventListener("click", () => {

        payloadSeparated = true;

        updateStatus("Payload Successfully Separated");

        updateErrorCode();

    });

}

// ------------------------------------------
// Emergency Parachute
// ------------------------------------------

const parachuteBtn = document.getElementById("parachute-btn");

if (parachuteBtn) {

    parachuteBtn.addEventListener("click", () => {

        parachuteActivated = true;

        updateStatus("Emergency Parachute Activated");

        updateErrorCode();

    });

}

// ------------------------------------------
// Redundant Activation
// ------------------------------------------

const redundantBtn = document.getElementById("redundant-btn");

if (redundantBtn) {

    redundantBtn.addEventListener("click", () => {

        gpsAvailable = true;

        updateStatus("Redundant System Activated");

        updateErrorCode();

    });

}

// ------------------------------------------
// Simulation Mode
// ------------------------------------------

const simulationToggle =
document.getElementById("simulation-mode");

if (simulationToggle) {

    simulationToggle.addEventListener("change", (event) => {

        simulationMode = event.target.checked;

        if (simulationMode) {

            updateStatus("Simulation Mode Enabled");

        }

        else {

            updateStatus("Simulation Mode Disabled");

        }

    });

}

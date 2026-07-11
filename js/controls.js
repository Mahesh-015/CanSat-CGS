// ==========================================
// CanSat GCS - Control Buttons
// ==========================================

let telemetryRunning = true;

// Start Telemetry
document.getElementById("start-btn").addEventListener("click", () => {

    telemetryRunning = true;

    document.getElementById("command-status").textContent =
        "Telemetry Started";

});

// Stop Telemetry
document.getElementById("stop-btn").addEventListener("click", () => {

    telemetryRunning = false;

    document.getElementById("command-status").textContent =
        "Telemetry Stopped";

});

// Reset Packet Counter
document.getElementById("reset-btn").addEventListener("click", () => {

    packetCount = 0;

    document.getElementById("command-status").textContent =
        "Packet Counter Reset";

});

// Sync PC Time
document.getElementById("sync-btn").addEventListener("click", () => {

    const currentTime = new Date().toLocaleTimeString();

    document.getElementById("mission-time").textContent = currentTime;

    document.getElementById("command-status").textContent =
        "PC Time Synced";

});

// Export CSV (Placeholder)
document.getElementById("csv-btn").addEventListener("click", () => {

    alert("CSV Export will be implemented later.");

});

// Export Graph (Placeholder)
document.getElementById("graph-btn").addEventListener("click", () => {

    alert("Graph Export will be implemented later.");

});

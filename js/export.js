// ==========================================
// CanSat Ground Control Station
// export.js
// ==========================================

// ------------------------------------------
// Telemetry Log Storage
// ------------------------------------------

let telemetryLog = [];

let lastLoggedPacket = -1;


// ==========================================
// Log Telemetry
// ==========================================

function logTelemetry() {

    if (packetCount === lastLoggedPacket)
        return;

    lastLoggedPacket = packetCount;

    telemetryLog.push({

        packet: packetCount,

        time: new Date().toLocaleTimeString(),

        altitude: Number(altitude.toFixed(2)),

        temperature: Number(temperature.toFixed(2)),

        pressure: Number(pressure.toFixed(2)),

        descentRate: Number(descentRate.toFixed(2)),

        battery: Number(battery.toFixed(2)),

        latitude: Number(latitude.toFixed(6)),

        longitude: Number(longitude.toFixed(6)),

        roll: Number(roll.toFixed(2)),

        pitch: Number(pitch.toFixed(2)),

        yaw: Number(yaw.toFixed(2))

    });

}


// ==========================================
// Export CSV
// ==========================================

function exportCSV() {

    if (telemetryLog.length === 0) {

        alert("No telemetry available.");

        return;

    }

    let csv = "";

    csv += "Packet,";
    csv += "Mission Time,";
    csv += "Altitude(m),";
    csv += "Temperature(C),";
    csv += "Pressure(hPa),";
    csv += "Descent Rate(m/s),";
    csv += "Battery(V),";
    csv += "Latitude,";
    csv += "Longitude,";
    csv += "Roll(deg),";
    csv += "Pitch(deg),";
    csv += "Yaw(deg)\n";

    telemetryLog.forEach(data => {

        csv +=

`${data.packet},
${data.time},
${data.altitude},
${data.temperature},
${data.pressure},
${data.descentRate},
${data.battery},
${data.latitude},
${data.longitude},
${data.roll},
${data.pitch},
${data.yaw}`.replace(/\n/g, "") + "\n";

    });

    downloadFile(

        csv,

        getFileName("Telemetry", "csv"),

        "text/csv"

    );

}


// ==========================================
// Export JSON (Optional)
// ==========================================

function exportJSON() {

    if (telemetryLog.length === 0) {

        alert("No telemetry available.");

        return;

    }

    const json = JSON.stringify(

        telemetryLog,

        null,

        4

    );

    downloadFile(

        json,

        getFileName("Telemetry", "json"),

        "application/json"

    );

}


// ==========================================
// Download Helper
// ==========================================

function downloadFile(content, filename, type) {

    const blob = new Blob(

        [content],

        {

            type: type + ";charset=utf-8"

        }

    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

}


// ==========================================
// Generate Filename
// ==========================================

function getFileName(prefix, extension) {

    const now = new Date();

    const yyyy = now.getFullYear();

    const mm = String(now.getMonth() + 1).padStart(2, "0");

    const dd = String(now.getDate()).padStart(2, "0");

    const hh = String(now.getHours()).padStart(2, "0");

    const mi = String(now.getMinutes()).padStart(2, "0");

    const ss = String(now.getSeconds()).padStart(2, "0");

    return `CanSat_${prefix}_${yyyy}-${mm}-${dd}_${hh}-${mi}-${ss}.${extension}`;

}


// ==========================================
// Clear Telemetry Log
// ==========================================

function clearTelemetryLog() {

    telemetryLog = [];

    lastLoggedPacket = -1;

}


// ==========================================
// Mission Statistics
// ==========================================

function getMissionStatistics() {

    if (telemetryLog.length === 0)
        return null;

    return {

        packets: telemetryLog.length,

        maxAltitude: Math.max(

            ...telemetryLog.map(x => x.altitude)

        ),

        minAltitude: Math.min(

            ...telemetryLog.map(x => x.altitude)

        ),

        highestTemperature: Math.max(

            ...telemetryLog.map(x => x.temperature)

        ),

        lowestBattery: Math.min(

            ...telemetryLog.map(x => x.battery)

        )

    };

}


// ==========================================
// Console Information
// ==========================================

console.log("Export Module Loaded");

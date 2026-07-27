// ==========================================
// CanSat Ground Control Station
// serial.js
// ==========================================

// ------------------------------------------
// Serial Variables
// ------------------------------------------

let port = null;
let reader = null;
let serialConnected = false;


// ==========================================
// Connect Serial
// ==========================================

async function connectSerial() {

    if (!("serial" in navigator)) {

        alert("Web Serial API is not supported in this browser.\nUse Google Chrome or Microsoft Edge.");

        return;

    }

    try {

        port = await navigator.serial.requestPort();

        await port.open({

            baudRate: 9600

        });

        serialConnected = true;

        updateStatus("Serial Connected");

        const status = document.getElementById("serial-status");

        if (status) {

            status.textContent = "● CONNECTED";

            status.className = "status-indicator online";

        }

        readSerial();

    }

    catch (error) {

        console.error(error);

        updateStatus("Serial Connection Failed");

    }

}


// ==========================================
// Disconnect Serial
// ==========================================

async function disconnectSerial() {

    try {

        if (reader) {

            await reader.cancel();

            reader.releaseLock();

            reader = null;

        }

        if (port) {

            await port.close();

            port = null;

        }

        serialConnected = false;

        updateStatus("Serial Disconnected");

        const status = document.getElementById("serial-status");

        if (status) {

            status.textContent = "● DISCONNECTED";

            status.className = "status-indicator offline";

        }

    }

    catch (error) {

        console.error(error);

    }

}


// ==========================================
// Read Serial Data
// ==========================================

async function readSerial() {

    const decoder = new TextDecoderStream();

    port.readable.pipeTo(decoder.writable);

    reader = decoder.readable.getReader();

    let buffer = "";

    while (serialConnected) {

        try {

            const { value, done } = await reader.read();

            if (done)
                break;

            buffer += value;

            const lines = buffer.split("\n");

            buffer = lines.pop();

            lines.forEach(parseTelemetry);

        }

        catch (error) {

            console.error(error);

            break;

        }

    }

}


// ==========================================
// Parse Incoming Telemetry
// Packet Format:
// Packet,Altitude,Temperature,
// Pressure,DescentRate,Battery,
// Latitude,Longitude,Roll,
// Pitch,Yaw
// ==========================================

function parseTelemetry(packet) {

    packet = packet.trim();

    if (packet.length === 0)
        return;

    const data = packet.split(",");

    if (data.length < 11)
        return;

    packetCount = Number(data[0]);

    altitude = Number(data[1]);

    temperature = Number(data[2]);

    pressure = Number(data[3]);

    descentRate = Number(data[4]);

    battery = Number(data[5]);

    latitude = Number(data[6]);

    longitude = Number(data[7]);

    roll = Number(data[8]);

    pitch = Number(data[9]);

    yaw = Number(data[10]);

}


// ==========================================
// Send Command
// ==========================================

async function sendCommand(command) {

    if (!serialConnected || !port)
        return;

    try {

        const encoder = new TextEncoder();

        const writer = port.writable.getWriter();

        await writer.write(

            encoder.encode(command + "\n")

        );

        writer.releaseLock();

    }

    catch (error) {

        console.error(error);

    }

}


// ==========================================
// Mission Commands
// ==========================================

function sendManualSeparation() {

    sendCommand("SEPARATE");

}

function sendEmergencyParachute() {

    sendCommand("PARACHUTE");

}

function sendRedundantActivation() {

    sendCommand("REDUNDANT");

}


// ==========================================
// Check Connection
// ==========================================

function isSerialConnected() {

    return serialConnected;

}


// ==========================================
// Console
// ==========================================

console.log("Serial Module Loaded");

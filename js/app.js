
// ==========================================
// CanSat GCS - Dummy Telemetry Simulator
// ==========================================

// Initial Values
let packetCount = 0;
let altitude = 500;
let temperature = 28;
let pressure = 1013;
let descentRate = 9;
let battery = 8.4;
let latitude = 12.9716;
let longitude = 77.5946;

// Update Telemetry Every Second
setInterval(() => {

    if(!telemetryRunning){
        return;
    }

    packetCount++;

    altitude -= Math.random() * 3;

    temperature += (Math.random() - 0.5) * 0.5;

    pressure += (Math.random() - 0.5) * 2;

    descentRate = 8 + Math.random() * 2;

    battery -= 0.002;

    latitude += 0.00005;

    longitude += 0.00005;

    // Update Table
    document.getElementById("packet-count").textContent = packetCount;

    document.getElementById("mission-time").textContent =
        new Date().toLocaleTimeString();

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

    updateCharts();

},1000);


// ==========================================
// Update Graphs
// ==========================================

function updateCharts(){

    addData(altitudeChart, altitude);

    addData(temperatureChart, temperature);

    addData(pressureChart, pressure);

    addData(descentChart, descentRate);

    addData(batteryChart, battery);

}


// ==========================================
// Generic Function
// ==========================================

function addData(chart,value){

    chart.data.labels.push(packetCount);

    chart.data.datasets[0].data.push(value);

    if(chart.data.labels.length>20){

        chart.data.labels.shift();

        chart.data.datasets[0].data.shift();

    }

    chart.update();

}

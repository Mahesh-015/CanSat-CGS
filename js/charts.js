// ==========================================
// CanSat Ground Control Station
// charts.js
// ==========================================

// ------------------------------------------
// Common Chart Options
// ------------------------------------------

const chartOptions = {

    responsive: true,

    maintainAspectRatio: false,

    animation: false,

    interaction: {

        intersect: false,

        mode: "index"

    },

    plugins: {

        legend: {

            display: false

        }

    },

    elements: {

        point: {

            radius: 2,

            hoverRadius: 4

        },

        line: {

            borderWidth: 2,

            tension: 0.35

        }

    },

    scales: {

        x: {

            ticks: {

                color: "#FFFFFF"

            },

            grid: {

                color: "#293548"

            }

        },

        y: {

            ticks: {

                color: "#FFFFFF"

            },

            grid: {

                color: "#293548"

            }

        }

    }

};


// ------------------------------------------
// Altitude Chart
// ------------------------------------------

const altitudeChart = new Chart(

    document.getElementById("altitudeChart"),

    {

        type: "line",

        data: {

            labels: [],

            datasets: [

                {

                    label: "Altitude",

                    data: [],

                    borderColor: "#00E5FF",

                    backgroundColor: "rgba(0,229,255,0.15)",

                    fill: true

                }

            ]

        },

        options: chartOptions

    }

);


// ------------------------------------------
// Temperature Chart
// ------------------------------------------

const temperatureChart = new Chart(

    document.getElementById("temperatureChart"),

    {

        type: "line",

        data: {

            labels: [],

            datasets: [

                {

                    label: "Temperature",

                    data: [],

                    borderColor: "#FF9800",

                    backgroundColor: "rgba(255,152,0,0.15)",

                    fill: true

                }

            ]

        },

        options: chartOptions

    }

);


// ------------------------------------------
// Pressure Chart
// ------------------------------------------

const pressureChart = new Chart(

    document.getElementById("pressureChart"),

    {

        type: "line",

        data: {

            labels: [],

            datasets: [

                {

                    label: "Pressure",

                    data: [],

                    borderColor: "#00C853",

                    backgroundColor: "rgba(0,200,83,0.15)",

                    fill: true

                }

            ]

        },

        options: chartOptions

    }

);


// ------------------------------------------
// Descent Rate Chart
// ------------------------------------------

const descentChart = new Chart(

    document.getElementById("descentChart"),

    {

        type: "line",

        data: {

            labels: [],

            datasets: [

                {

                    label: "Descent Rate",

                    data: [],

                    borderColor: "#E91E63",

                    backgroundColor: "rgba(233,30,99,0.15)",

                    fill: true

                }

            ]

        },

        options: chartOptions

    }

);


// ------------------------------------------
// Battery Voltage Chart
// ------------------------------------------

const batteryChart = new Chart(

    document.getElementById("batteryChart"),

    {

        type: "line",

        data: {

            labels: [],

            datasets: [

                {

                    label: "Battery",

                    data: [],

                    borderColor: "#FFC107",

                    backgroundColor: "rgba(255,193,7,0.15)",

                    fill: true

                }

            ]

        },

        options: chartOptions

    }

);


// ==========================================
// Generic Chart Update Function
// ==========================================

function updateChart(chart, value) {

    if (!chart) return;

    chart.data.labels.push(packetCount);

    chart.data.datasets[0].data.push(value);

    if (chart.data.labels.length > 20) {

        chart.data.labels.shift();

        chart.data.datasets[0].data.shift();

    }

    chart.update();

}


// ==========================================
// Update All Charts
// ==========================================

function updateCharts() {

    updateChart(altitudeChart, altitude);

    updateChart(temperatureChart, temperature);

    updateChart(pressureChart, pressure);

    updateChart(descentChart, descentRate);

    updateChart(batteryChart, battery);

}


// ==========================================
// Export Graphs
// ==========================================

function exportGraphs() {

    const charts = [

        {
            chart: altitudeChart,
            name: "Altitude"
        },

        {
            chart: temperatureChart,
            name: "Temperature"
        },

        {
            chart: pressureChart,
            name: "Pressure"
        },

        {
            chart: descentChart,
            name: "DescentRate"
        },

        {
            chart: batteryChart,
            name: "Battery"
        }

    ];

    charts.forEach(item => {

        const link = document.createElement("a");

        link.href = item.chart.toBase64Image();

        link.download = item.name + ".png";

        link.click();

    });

}

console.log("Charts Loaded Successfully");

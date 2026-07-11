// ==========================================
// CanSat GCS - Charts
// ==========================================

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,

    plugins: {
        legend: {
            display: false
        }
    },

    scales: {

        x: {
            ticks: {
                color: "#FFFFFF"
            },
            grid: {
                color: "#2D3748"
            }
        },

        y: {
            ticks: {
                color: "#FFFFFF"
            },
            grid: {
                color: "#2D3748"
            }
        }

    }

};

const altitudeChart = new Chart(
    document.getElementById("altitudeChart"),
    {
        type: "line",

        data: {

            labels: [],

            datasets: [{
                label: "Altitude",

                data: [],

                borderColor: "#00E5FF",

                borderWidth: 2,

                tension: 0.3

            }]
        },

        options: chartOptions
    }
);

const temperatureChart = new Chart(
    document.getElementById("temperatureChart"),
    {

        type: "line",

        data: {

            labels: [],

            datasets: [{
                data: [],
                borderColor: "#FF9800",
                borderWidth: 2,
                tension: 0.3
            }]
        },

        options: chartOptions

    }
);

const pressureChart = new Chart(
    document.getElementById("pressureChart"),
    {

        type: "line",

        data: {

            labels: [],

            datasets: [{
                data: [],
                borderColor: "#00C853",
                borderWidth: 2,
                tension: 0.3
            }]
        },

        options: chartOptions

    }
);

const descentChart = new Chart(
    document.getElementById("descentChart"),
    {

        type: "line",

        data: {

            labels: [],

            datasets: [{
                data: [],
                borderColor: "#E91E63",
                borderWidth: 2,
                tension: 0.3
            }]
        },

        options: chartOptions

    }
);

const batteryChart = new Chart(
    document.getElementById("batteryChart"),
    {

        type: "line",

        data: {

            labels: [],

            datasets: [{
                data: [],
                borderColor: "#FFC107",
                borderWidth: 2,
                tension: 0.3
            }]
        },

        options: chartOptions

    }
);

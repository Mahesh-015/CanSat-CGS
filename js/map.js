// ==========================================
// CanSat Ground Control Station
// map.js
// ==========================================

// ------------------------------------------
// Initial Coordinates
// ------------------------------------------

const INITIAL_LAT = 12.971600;
const INITIAL_LON = 77.594600;


// ------------------------------------------
// Create Map
// ------------------------------------------

const map = L.map("map").setView(

    [INITIAL_LAT, INITIAL_LON],

    16

);


// ------------------------------------------
// OpenStreetMap Layer
// ------------------------------------------

L.tileLayer(

    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

    {

        maxZoom: 19,

        attribution: "&copy; OpenStreetMap Contributors"

    }

).addTo(map);


// ------------------------------------------
// Payload Marker
// ------------------------------------------

const marker = L.marker(

    [INITIAL_LAT, INITIAL_LON]

).addTo(map);

marker.bindPopup("CanSat Payload");


// ------------------------------------------
// Mission Path
// ------------------------------------------

const missionPath = L.polyline(

    [],

    {

        color: "#00E5FF",

        weight: 4,

        opacity: 0.9

    }

).addTo(map);


// ------------------------------------------
// Mission Start Marker
// ------------------------------------------

let startMarker = null;


// ------------------------------------------
// Mission End Marker
// ------------------------------------------

let endMarker = null;


// ==========================================
// Update Map
// ==========================================

function updateMap(lat, lon) {

    const position = [lat, lon];

    marker.setLatLng(position);

    marker.setPopupContent(

        `<b>CanSat Payload</b><br>
         Latitude : ${lat.toFixed(6)}<br>
         Longitude : ${lon.toFixed(6)}`

    );

    missionPath.addLatLng(position);

    map.panTo(position, {

        animate: true,

        duration: 0.5

    });

}


// ==========================================
// Mark Mission Start
// ==========================================

function markMissionStart(lat, lon) {

    if (startMarker)

        map.removeLayer(startMarker);

    startMarker = L.circleMarker(

        [lat, lon],

        {

            radius: 8,

            color: "#22C55E",

            fillColor: "#22C55E",

            fillOpacity: 1

        }

    ).addTo(map);

    startMarker.bindPopup("Mission Start");

}


// ==========================================
// Mark Mission End
// ==========================================

function markMissionEnd(lat, lon) {

    if (endMarker)

        map.removeLayer(endMarker);

    endMarker = L.circleMarker(

        [lat, lon],

        {

            radius: 8,

            color: "#EF4444",

            fillColor: "#EF4444",

            fillOpacity: 1

        }

    ).addTo(map);

    endMarker.bindPopup("Mission End");

}


// ==========================================
// Reset Map
// ==========================================

function resetMap() {

    missionPath.setLatLngs([]);

    marker.setLatLng(

        [INITIAL_LAT, INITIAL_LON]

    );

    map.setView(

        [INITIAL_LAT, INITIAL_LON],

        16

    );

    if (startMarker) {

        map.removeLayer(startMarker);

        startMarker = null;

    }

    if (endMarker) {

        map.removeLayer(endMarker);

        endMarker = null;

    }

}


// ==========================================
// Get Current Coordinates
// ==========================================

function getCurrentCoordinates() {

    return marker.getLatLng();

}


// ==========================================
// Fit Entire Mission Path
// ==========================================

function zoomToMission() {

    if (missionPath.getLatLngs().length > 1) {

        map.fitBounds(

            missionPath.getBounds(),

            {

                padding: [25, 25]

            }

        );

    }

}


// ==========================================
// Console
// ==========================================

console.log("GPS Map Module Loaded");

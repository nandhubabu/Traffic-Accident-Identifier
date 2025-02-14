document.addEventListener("DOMContentLoaded", function () {
    // Get data from the HTML element
    const mapData = document.getElementById("map-data");

    if (mapData) {
        const location = JSON.parse(mapData.getAttribute("data-location"));
        const destination = JSON.parse(mapData.getAttribute("data-destination"));
        const locationLat = parseFloat(mapData.getAttribute("data-location-lat"));
        const locationLon = parseFloat(mapData.getAttribute("data-location-lon"));
        const destinationLat = parseFloat(mapData.getAttribute("data-destination-lat"));
        const destinationLon = parseFloat(mapData.getAttribute("data-destination-lon"));

        // Initialize the map
        const map = L.map("map").setView([locationLat, locationLon], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Add accident location marker
        const accidentMarker = L.marker([locationLat, locationLon]).addTo(map)
            .bindPopup(`<strong>Accident Location:</strong> ${location}`)
            .openPopup();

        // Add destination marker and routing if destination coordinates are available
        if (destinationLat && destinationLon) {
            const destinationMarker = L.marker([destinationLat, destinationLon]).addTo(map)
                .bindPopup(`<strong>Destination:</strong> ${destination}`);

            L.Routing.control({
                waypoints: [
                    L.latLng(locationLat, locationLon),
                    L.latLng(destinationLat, destinationLon),
                ],
                routeWhileDragging: true,
                addWaypoints: false,
                show: false,
            }).addTo(map);
        }
    } else {
        console.error("Map data element not found.");
    }
});
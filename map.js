document.addEventListener('DOMContentLoaded', () => {
    const getLocationBtn = document.getElementById('get-location-btn');
    const mapContainer = document.getElementById('map-container');
    const mapElement = document.getElementById('map');

    let map;
    let marker;

    
    const initMap = (lat, lon) => {
        mapContainer.style.display = 'block';

       
        map = L.map(mapElement).setView([lat, lon], 13);

        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

       
        marker = L.marker([lat, lon]).addTo(map)
            .bindPopup('You are here!')
            .openPopup();

        
        const navigateBtn = document.createElement('a');
        navigateBtn.href = `gmap.html?lat=${lat}&lon=${lon}`;
        navigateBtn.textContent = 'Navigate to Christ University';
        navigateBtn.classList.add('btn', 'btn-primary', 'mt-3');
        mapContainer.appendChild(navigateBtn);
    };

   
    const handleLocationSuccess = (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        initMap(lat, lon);
    };

    
    const handleLocationError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.");
                break;
        }
       
        const defaultLat = 12.9716;
        const defaultLon = 77.5946; 
        initMap(defaultLat, defaultLon);
    };

   
    getLocationBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(handleLocationSuccess, handleLocationError, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    });
});

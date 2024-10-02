document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM fully loaded and parsed');  // Check if DOMContentLoaded event is firing

    const apiKey = 'f2189018a0b344c6b0353805240210';
    const baseUrl = 'https://api.weatherapi.com/v1/current.json';

    function fetchWeather(query, isSearch = false) {
        console.log('Fetching weather for:', query);  // Log the query
        const url = `${baseUrl}?key=${apiKey}&q=${query}`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Weather data:', data);  // Log weather data
                displayWeather(data, isSearch);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                alert('Error fetching weather data. Please try again later.');
            });
    }

    // Function to display weather data
    function displayWeather(data, isSearch) {
        const locationElement = isSearch ? document.getElementById('searched-location-tab') : document.getElementById('location');
        const temperatureElement = isSearch ? document.getElementById('searched-temperature-tab') : document.getElementById('temperature');
        const conditionElement = isSearch ? document.getElementById('searched-condition-tab') : document.getElementById('condition');
        const humidityElement = isSearch ? document.getElementById('searched-humidity-tab') : document.getElementById('humidity');
        const windElement = isSearch ? document.getElementById('searched-wind-tab') : document.getElementById('wind');
        const iconElement = isSearch ? document.getElementById('searched-icon-tab') : document.getElementById('icon');
        const timeElement = isSearch ? document.getElementById('searched-time-tab') : document.getElementById('local-time'); // New time element


        if (!locationElement || !temperatureElement || !conditionElement || !humidityElement || !windElement || !iconElement || !timeElement) {
            console.error('One or more elements are missing in the HTML.');
            return;
        }

        locationElement.textContent = `${data.location.name}, ${data.location.country}`;
        temperatureElement.innerHTML = `${data.current.temp_c}&#8451;`;
        conditionElement.textContent = `${data.current.condition.text}`;
        humidityElement.textContent = `Humidity: ${data.current.humidity}%`;
        windElement.textContent = `Wind: ${data.current.wind_kph} kph`;

        const iconUrl = `https:${data.current.condition.icon}`;
        iconElement.innerHTML = `<img src="${iconUrl}" alt="Weather icon">`;

        // Display the local time of the location
        timeElement.textContent = `${data.location.localtime}`;


        
    }


    if (navigator.geolocation) {
        console.log('Attempting to get user location');  // Log that we're attempting to get location
        navigator.geolocation.getCurrentPosition(
            function (position) {
                console.log('Got location:', position.coords);  // Log location coordinates
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                fetchWeather(`${latitude},${longitude}`);
            },
            function (error) {
                console.error('Error getting location:', error);
                fetchWeather('London');  // Fallback to default location
            }
        );
    } else {
        fetchWeather('London');  // Fallback to default location
    }

    document.getElementById('searchButtonTab').addEventListener('click', function () {
        const searchQuery = document.getElementById('searchInputTab').value.trim();
        console.log('Search button clicked with query:', searchQuery);  // Log the search query
        if (searchQuery) {
            fetchWeather(searchQuery, true);
        } else {
            searchQ();
        }
    });

    function searchQ(){
        document.getElementById('searchButtonTab').addEventListener('click', function () {
            const searchQuery = document.getElementById('searchInputTab').value.trim();
            console.log('Search button clicked with query:', searchQuery);  // Log the search query
            if (searchQuery) {
                fetchWeather(searchQuery, true);
            } else {
                alert('Please enter a location to search.');
            }
        });
    }
});

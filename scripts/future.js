document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'f2189018a0b344c6b0353805240210';
    const baseUrl = 'https://api.weatherapi.com/v1/forecast.json';

    // Function to fetch weather data including the forecast for 5 days
    function fetchWeather(query) {
        const url = `${baseUrl}?key=${apiKey}&q=${query}&days=6`; // Get forecast for today + next 5 days

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Weather data:', data); // Log data for debugging
                displayFutureWeather(data.forecast.forecastday);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                alert('Error fetching weather data. Please try again later.'); // Notify the user
            });
    }

    // Function to display weather data for the next 5 days
    function displayFutureWeather(forecastData) {
        forecastData.slice(1, 6).forEach((dayData, index) => { // Skip today and get the next 5 days
            const dayElement = document.getElementById(`d-${index + 1}`); // Select elements with IDs like d-1, d-2, etc.
            const dayElement1 = document.getElementById(`d-${index + 1}-tab`);
            const dayElement2 = document.getElementById(`d-${index + 1}-mob`);

            if (dayElement) {
                dayElement.innerHTML = `
                <div class="row" style="height:100%;">
                    <div class="col" style="display:flex; align-items:center; justify-content:center;">
                        <table style="width:60%;">
                            <tr>
                                <td><center>&nbsp;<i class="fa-solid fa-temperature-low" style="color: #ffffff;"></i></center></td>
                                <td><div id="temp">&nbsp;&nbsp;${dayData.day.avgtemp_c}&#8451;</div><br></td>
                            </tr>
                            <tr>
                                <td><center>&nbsp;<i class="fa-solid fa-wind" style="color: #ffffff;"></i></center></td>
                                <td><div id="wind">&nbsp;&nbsp;${dayData.day.maxwind_kph} kph</div><br></td>
                            </tr>
                            <tr>
                                <td><center>&nbsp;<i class="fa-solid fa-droplet" style="color: #ffffff;"></i></center></td>
                                <td><div id="humidity">&nbsp;&nbsp;${dayData.day.avghumidity}%</div></td>
                            </tr>
                        </table>
                    </div>
                    <div class="col" style="display:flex; align-items:center; justify-content:left;">
                        <table>
                            <tr>
                                <td><p><strong>${dayData.date}</p></td>
                            </tr>
                            <tr>
                                <td><img src="https:${dayData.day.condition.icon}" alt="Weather icon"></td>
                            </tr>
                            <tr>
                                <td><p><br>${dayData.day.condition.text}</p></td>
                            </tr>
                        </table>                                              
                    </div>
                </div>
            `;
            }

            if (dayElement1) {
                dayElement1.innerHTML = `
                <div class="row" style="height:100%;">
                    <div class="col" style="display:flex; align-items:center; justify-content:center;">
                        <table style="width:60%;">
                            <tr>
                                <td><center>&nbsp;<i class="fa-solid fa-temperature-low" style="color: #ffffff;"></i></center></td>
                                <td><div id="temp">&nbsp;&nbsp;${dayData.day.avgtemp_c}&#8451;</div><br></td>
                            </tr>
                            <tr>
                                <td><center>&nbsp;<i class="fa-solid fa-wind" style="color: #ffffff;"></i></center></td>
                                <td><div id="wind">&nbsp;&nbsp;${dayData.day.maxwind_kph} kph</div><br></td>
                            </tr>
                            <tr>
                                <td><center>&nbsp;<i class="fa-solid fa-droplet" style="color: #ffffff;"></i></center></td>
                                <td><div id="humidity">&nbsp;&nbsp;${dayData.day.avghumidity}%</div></td>
                            </tr>
                        </table>
                    </div>
                    <div class="col" style="display:flex; align-items:center; justify-content:left;">
                        <table>
                            <tr>
                                <td><p>${dayData.date}</p></td>
                            </tr>
                            <tr>
                                <td><img src="https:${dayData.day.condition.icon}" alt="Weather icon"></td>
                            </tr>
                            <tr>
                                <td><p><br>${dayData.day.condition.text}</p></td>
                            </tr>
                        </table>                                              
                    </div>
                </div>
            `;
            }

            if (dayElement2) {
                dayElement2.innerHTML = `
                <div class="row" style="height:100%;">
                    <div class="col" style="display:flex; align-items:center; justify-content:center;">
                        <table style="width:60%;">
                            <tr>
                                <td><center>&nbsp;<i class="fa-solid fa-temperature-low" style="color: #ffffff;"></i></center></td>
                                <td><div id="temp">&nbsp;&nbsp;${dayData.day.avgtemp_c}&#8451;</div><br></td>
                            </tr>
                            <tr>
                                <td><center>&nbsp;<i class="fa-solid fa-wind" style="color: #ffffff;"></i></center></td>
                                <td><div id="wind">&nbsp;&nbsp;${dayData.day.maxwind_kph} kph</div><br></td>
                            </tr>
                            <tr>
                                <td><center>&nbsp;<i class="fa-solid fa-droplet" style="color: #ffffff;"></i></center></td>
                                <td><div id="humidity">&nbsp;&nbsp;${dayData.day.avghumidity}%</div></td>
                            </tr>
                        </table>
                    </div>
                    <div class="col" style="display:flex; align-items:center; justify-content:left;">
                        <table>
                            <tr>
                                <td><p>${dayData.date}</p></td>
                            </tr>
                            <tr>
                                <td><img src="https:${dayData.day.condition.icon}" alt="Weather icon"></td>
                            </tr>
                            <tr>
                                <td><p><br>${dayData.day.condition.text}</p></td>
                            </tr>
                        </table>                                              
                    </div>
                </div>
            `;
            }
        });
        
    }




    // Get user's current location and fetch weather data
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                fetchWeather(`${latitude},${longitude}`);
            },
            function (error) {
                console.error('Error getting location:', error);
                fetchWeather('London'); // Fallback to default location
            }
        );
    } else {
        fetchWeather('London'); // Fallback to default location
    }
});

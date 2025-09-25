
        // Weather icons mapping
        const weatherIcons = {
            'clear': '☀️',
            'sunny': '☀️',
            'clouds': '☁️',
            'cloudy': '☁️',
            'rain': '🌧️',
            'rainy': '🌧️',
            'thunderstorm': '⛈️',
            'snow': '❄️',
            'snowy': '❄️',
            'mist': '🌫️',
            'fog': '🌫️',
            'haze': '🌫️'
        };

        // Demo weather data for different cities
        const demoWeatherData = {
            'london': {
                name: 'London',
                main: {
                    temp: 15,
                    feels_like: 13,
                    humidity: 65,
                    pressure: 1013
                },
                weather: [{
                    main: 'Clouds',
                    description: 'overcast clouds'
                }],
                wind: {
                    speed: 3.2
                }
            },
            'new york': {
                name: 'New York',
                main: {
                    temp: 22,
                    feels_like: 24,
                    humidity: 58,
                    pressure: 1018
                },
                weather: [{
                    main: 'Clear',
                    description: 'clear sky'
                }],
                wind: {
                    speed: 2.8
                }
            },
            'tokyo': {
                name: 'Tokyo',
                main: {
                    temp: 26,
                    feels_like: 28,
                    humidity: 72,
                    pressure: 1008
                },
                weather: [{
                    main: 'Rain',
                    description: 'light rain'
                }],
                wind: {
                    speed: 4.1
                }
            },
            'paris': {
                name: 'Paris',
                main: {
                    temp: 18,
                    feels_like: 17,
                    humidity: 60,
                    pressure: 1015
                },
                weather: [{
                    main: 'Clouds',
                    description: 'partly cloudy'
                }],
                wind: {
                    speed: 2.5
                }
            },
            'sydney': {
                name: 'Sydney',
                main: {
                    temp: 28,
                    feels_like: 31,
                    humidity: 45,
                    pressure: 1020
                },
                weather: [{
                    main: 'Clear',
                    description: 'sunny'
                }],
                wind: {
                    speed: 5.2
                }
            }
        };

        // Elements
        const cityInput = document.getElementById('cityInput');
        const searchBtn = document.getElementById('searchBtn');
        const loading = document.getElementById('loading');
        const errorMessage = document.getElementById('errorMessage');
        const weatherCard = document.getElementById('weatherCard');

        // Weather display elements
        const cityName = document.getElementById('cityName');
        const weatherIcon = document.getElementById('weatherIcon');
        const temperature = document.getElementById('temperature');
        const description = document.getElementById('description');
        const feelsLike = document.getElementById('feelsLike');
        const humidity = document.getElementById('humidity');
        const windSpeed = document.getElementById('windSpeed');
        const pressure = document.getElementById('pressure');

        // Initialize with London weather
        weatherCard.classList.add('show');

        // Event listeners
        searchBtn.addEventListener('click', searchWeather);
        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchWeather();
            }
        });

        async function searchWeather() {
            const city = cityInput.value.trim();
            
            if (!city) {
                showError('Please enter a city name');
                return;
            }

            showLoading();
            hideError();
            weatherCard.classList.remove('show');

            try {
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                const weatherData = await fetchWeatherData(city);
                displayWeatherData(weatherData);
                
            } catch (error) {
                showError(error.message);
            } finally {
                hideLoading();
            }
        }

        // Simulated API call function
        async function fetchWeatherData(city) {
            const cityKey = city.toLowerCase();
            
            // Check if city exists in demo data
            if (demoWeatherData[cityKey]) {
                return demoWeatherData[cityKey];
            }
            
            // Generate random weather data for unknown cities
            const weatherTypes = ['Clear', 'Clouds', 'Rain', 'Thunderstorm'];
            const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
            
            return {
                name: city.charAt(0).toUpperCase() + city.slice(1),
                main: {
                    temp: Math.floor(Math.random() * 30) + 5, // 5-35°C
                    feels_like: Math.floor(Math.random() * 30) + 5,
                    humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
                    pressure: Math.floor(Math.random() * 50) + 1000 // 1000-1050 hPa
                },
                weather: [{
                    main: randomWeather,
                    description: randomWeather.toLowerCase()
                }],
                wind: {
                    speed: Math.random() * 10 + 1 // 1-11 m/s
                }
            };
        }

        function displayWeatherData(data) {
            cityName.textContent = data.name;
            temperature.textContent = `${Math.round(data.main.temp)}°C`;
            description.textContent = data.weather[0].description;
            feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
            humidity.textContent = `${data.main.humidity}%`;
            windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`; // Convert m/s to km/h
            pressure.textContent = `${data.main.pressure} hPa`;

            // Set weather icon
            const weatherCondition = data.weather[0].main.toLowerCase();
            weatherIcon.textContent = weatherIcons[weatherCondition] || '🌤️';

            // Update gradient based on weather
            updateWeatherCardStyle(weatherCondition);

            // Show the weather card with animation
            setTimeout(() => {
                weatherCard.classList.add('show');
            }, 100);
        }

        function updateWeatherCardStyle(condition) {
            let gradient;
            
            switch(condition) {
                case 'clear':
                    gradient = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
                    break;
                case 'clouds':
                    gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                    break;
                case 'rain':
                    gradient = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
                    break;
                case 'thunderstorm':
                    gradient = 'linear-gradient(135deg, #654ea3 0%, #eaafc8 100%)';
                    break;
                case 'snow':
                    gradient = 'linear-gradient(135deg, #e6ddd4 0%, #d5def5 100%)';
                    break;
                default:
                    gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            }
            
            weatherCard.style.background = gradient;
        }

        function showLoading() {
            loading.style.display = 'block';
        }

        function hideLoading() {
            loading.style.display = 'none';
        }

        function showError(message) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
            
            // Auto-hide error after 5 seconds
            setTimeout(() => {
                hideError();
            }, 5000);
        }

        function hideError() {
            errorMessage.style.display = 'none';
        }

        /* 
        REAL API INTEGRATION:
        To use the actual OpenWeather API, replace the fetchWeatherData function with:
        
        async function fetchWeatherData(city) {
            const API_KEY = 'YOUR_API_KEY_HERE';
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
            
            const response = await fetch(url);
            
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('City not found. Please check the spelling and try again.');
                } else if (response.status === 401) {
                    throw new Error('API key is invalid or missing.');
                } else {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
            }
            
            return await response.json();
        }
        */

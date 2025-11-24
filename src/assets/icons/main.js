const unitsBtn = document.querySelector(".units-btn");
const unitsDropdown = document.querySelector("#units-dropdown-list");
const dropdownItems = unitsDropdown.querySelectorAll("button");
const unitsBtnIconChevron = document.querySelector(".units-btn__icon-chevron")
let isOpen = false;

function openMenu() {
    unitsDropdown.classList.remove("hide");
    unitsBtn.setAttribute("aria-expanded", "true");
    unitsBtnIconChevron.classList.add("rotate-icon");
    isOpen = true;
}

function closeMenu() {
    unitsDropdown.classList.add("hide");
    unitsBtn.setAttribute("aria-expanded", "false");
    unitsBtnIconChevron.classList.remove("rotate-icon");
    isOpen = false;
}

// toggle dropdown on button click
unitsBtn.addEventListener("click", () => {
    isOpen ? closeMenu() : openMenu();
})

unitsBtn.addEventListener("focus", (e) => {
    if (!isOpen) openMenu();
})

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        if (isOpen) {
            closeMenu()
        };
    }
})


// ---------------

const form = document.querySelector("form");
const input = form.querySelector("#search_input");
const searchBtn = form.querySelector(".search-form__btn");

let settings = JSON.parse(localStorage.getItem("weatherSettings")) || {
    temperature: "celsius",
    windSpeed: "kmh",
    precipitation: "mm"
}

function saveSettings() {
    localStorage.setItem("weatherSettings", JSON.stringify(settings));
}


function showLoading(isLoading) {
    searchBtn.disabled = isLoading;
    searchBtn.textContent = isLoading ? "Loading..." : "Search";
}


function showError(msg) {
    alert(msg);
}


// Get Coordinates from city name
async function getCoordinates(cityName) {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;

    const response = await fetch(geoUrl);
    if (!response.ok) throw new Error("Failed ro fetch coordinates");

    const data = await response.json();
    if (!data.results || data.results.length === 0) throw new Error("City not found");


    const { latitude, longitude, name, country } = data.results[0];
    return { lat: latitude, lon: longitude, name: `${name}, ${country}` };
}


// Fetch Weather Data using city name 
async function fetchWeather(cityName) {
    const city = await getCoordinates(cityName);

    const unitsTemp = settings.temperature === "celsius" ? "celsius" : "fahrenheit";
    const unitsWind = settings.windSpeed === "kmh" ? "kmh" : "mph";
    const unitsPrecip = settings.precipitation === "mm" ? "mm" : "inch";

    // Build the API URL
    const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}` +
        `&current_weather=true` +
        `&timezone=auto` +
        `&temperature_unit=${unitsTemp}` +
        `&windspeed_unit=${unitsWind}` +
        `&precipitation_unit=${unitsPrecip}` +
        `&hourly=temperature_2m,apparent_temperature,relativehumidity_2m,precipitation,wind_speed_10m,weathercode` +
        `&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch weather data");

    const data = await response.json();
    return { city: city.name, weather: data };
}



function updateDom(data) {
    const { city, weather } = data;
    console.log(weather);

    // ========================
    // 1. Basic DOM elements
    // ========================
    const cityEl = document.querySelector(".weather__city");
    const dateEl = document.querySelector(".weather__date");
    const iconEl = document.querySelector(".weather__icon");
    const tempEl = document.querySelector(".weather__temp em")

    const feelsEl = document.querySelector(".details__feels-like");
    const humidityEl = document.querySelector(".details__humidity");
    const windEl = document.querySelector(".details__wind");
    const precipitationEl = document.querySelector(".details__precipitation");

    const hourlyList = document.querySelector(".hourly__list");
    const weeklyList = document.querySelector(".weekly__list");

    const current = weather.current_weather;
    const currentWeatherUnits = weather.current_weather_units;
    const daily = weather.daily;

    const hourly = weather.hourly;
    const hourlyUnits = weather.hourly_units;
    const dailyUnits = weather.daily_units;

    // ========================
    // 1. City + Date
    // ========================
    cityEl.textContent = city;

    dateEl.textContent = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric"
    })


    // ========================
    // 3. Current Weather
    // ========================
    iconEl.src = weatherCodeToIcon(current.weathercode);

    tempEl.innerHTML = `${Math.round(current.temperature)}${currentWeatherUnits.temperature}`


    // ========================
    // 4. details
    // ========================
    const firstIndex = 0;

    feelsEl.innerHTML = `${Math.round(hourly.apparent_temperature[firstIndex])}${hourlyUnits.apparent_temperature}`;
    humidityEl.textContent = `${hourly.relativehumidity_2m[firstIndex]}${hourlyUnits.relativehumidity_2m}`;
    windEl.textContent = `${Math.round(current.windspeed)} ${hourlyUnits.wind_speed_10m}`;
    precipitationEl.textContent = `${hourly.precipitation[firstIndex]} ${hourlyUnits.precipitation}`;


    // ========================
    // 5. Hourly forecast (first 8)
    // ========================

    hourlyList.innerHTML = "";

    for (let i = 0; i < 8; i++) {
        const hTime = hourly.time[i];
        const hTemp = hourly.temperature_2m[i];
        const hIcon = weatherCodeToIcon(hourly.weathercode[i]);

        hourlyList.innerHTML += `
             <div class="hourly__item">
              <div class="hourly__time-block">
                <img
                  class="hourly__icon"
                  src="${hIcon}"
                  alt=""
                />
                <p class="hourly__time">${formatHour(hTime)}</p>
              </div>
              <p class="hourly__temp">${Math.round(hTemp)}${hourlyUnits.apparent_temperature}</p>
            </div>
        `;
    }


    // ========================
    // 6. Weekly forecast (first 8)
    // ========================
    weeklyList.innerHTML = "";
    daily.time.forEach((day, i) => {
        const maxTemp = daily.temperature_2m_max[i];
        const minTemp = daily.temperature_2m_min[i];
        const icon = weatherCodeToIcon(daily.weathercode[i]);

        weeklyList.innerHTML += `
            <div class="weekly__item">
              <p class="weekly__day">${formatDay(day)}</p>
              <img
                class="weekly__icon"
                src="${icon}"
                alt=""
              />
              <div class="weekly_temps">
                <p class="weekly__high">${Math.round(maxTemp)}${dailyUnits.temperature_2m_max}</p>
                <p class="weekly__low">${Math.round(minTemp)}${dailyUnits.temperature_2m_min}</p>
              </div>
            </div>
        `
    })

}


// Load weather on form submit
async function loadWeather(cityName) {
    showLoading(true);

    try {
        const weatherData = await fetchWeather(cityName);
        updateDom(weatherData);
    } catch (err) {
        showError(err.message)
    } finally {
        showLoading(false);
    }
}

// Handle from submission
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const cityName = input.value.trim();
    if (!cityName) return;

    loadWeather(cityName);
})




// ===== HELPERS ==========

function weatherCodeToIcon(code) {
    const icons = {
        0: "1.svg",
        1: "1.svg",
        2: "3.svg",
        3: "4.svg",

        45: "15.svg",
        48: "15.svg",

        51: "9.svg",
        53: "9.svg",
        55: "9.svg",

        61: "9.svg",
        63: "10.svg",
        65: "10.svg",

        71: "13.svg",
        73: "13.svg",
        75: "50.svg",

        80: "9.svg",
        81: "10.svg",
        82: "111.svg",

        95: "11.svg",
        96: "22.svg",
        99: "29.svg",
    };

    return `/src/assets/icons/${icons[code] || "unknown.svg"}`;
}



function formatHour(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
        hour: "numeric",
        hour12: true
    })
}



function formatDay(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString([], {
        weekday: "short"
    })
}
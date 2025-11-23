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

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&hourly=temperature_2m,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&current_weather=true&temperature_unit=${unitsTemp}&windspeed_unit=${unitsWind}&precipitation_unit=${unitsPrecip}&timezone=auto`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch weather data");

    const data = await response.json();
    return { city: city.name, weather: data };
}


// Handle from submission
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const cityName = input.value.trim();
    if (!cityName) return;

    showLoading(true);

    try {
        const weatherData = await fetchWeather(cityName);
        console.log(weatherData);

        // TODO: fill the DOM with this data.


    } catch (err) {
        showError(err.message)
    } finally {
        showLoading(false);
    }
})





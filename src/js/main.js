import fetchWeather from "./api/fetchWeather";
import updateDom from "./ui/domUpdater";
import initDropdown from "./ui/initDropdown";

initDropdown();

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


// Load weather on form submit
async function loadWeather(cityName) {
    showLoading(true);

    try {
        const weatherData = await fetchWeather(cityName, settings);
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

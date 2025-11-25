import fetchWeather from "./api/fetchWeather";
import updateDom from "./ui/domUpdater";
import initDropdown from "./ui/initDropdown";
import showLoading from "./ui/showLoading";
import showCityNotFoundError from "./ui/showCityNotFoundError";
import showGeneralError from "./ui/showGeneralError";


initDropdown();

const form = document.querySelector("form");
const input = form.querySelector("#search_input");



let settings = JSON.parse(localStorage.getItem("weatherSettings")) || {
    temperature: "celsius",
    windSpeed: "kmh",
    precipitation: "mm"
}

function saveSettings() {
    localStorage.setItem("weatherSettings", JSON.stringify(settings));
}


// Load weather on form submit
async function loadWeather(cityName) {
    showLoading(true);
    showCityNotFoundError(false);

    try {
        const weatherData = await fetchWeather(cityName, settings);
        updateDom(weatherData);
    } catch (err) {
        if (err.code === "CITY_NOT_FOUND") {
            showCityNotFoundError();
        } else {
            showGeneralError(err.message)
        }
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

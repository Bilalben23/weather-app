import fetchWeather from "./api/fetchWeather";
import updateDom from "./ui/domUpdater";
import initDropdown from "./ui/initDropdown";
import showLoading from "./ui/showLoading";
import showCityNotFoundError from "./ui/showCityNotFoundError";
import showGeneralError from "./ui/showGeneralError";
import loadSavedCities from "./ui/loadSavedCities";

initDropdown();

const form = document.querySelector("form");
const input = form.querySelector("#search_input");
const dropdown = document.querySelector("#search-dropdown");


let settings = JSON.parse(localStorage.getItem("weatherSettings")) || {
    temperature: "celsius",
    windSpeed: "kmh",
    precipitation: "mm"
}


window.addEventListener("DOMContentLoaded", () => {
    const lastCity = localStorage.getItem("lastCity");
    const defaultCity = "Rabat";

    const cityToLoad = lastCity || defaultCity;

    loadWeather(cityToLoad);
})


// Load weather on form submit
async function loadWeather(cityName) {
    showLoading(true);
    showCityNotFoundError(false);
    showGeneralError(false);

    try {
        const weatherData = await fetchWeather(cityName, settings);
        updateDom(weatherData);
    } catch (err) {
        console.error(err);
        if (err.code === "CITY_NOT_FOUND") {
            showCityNotFoundError();
        } else {
            showGeneralError()
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

input.addEventListener("focus", () => {
    dropdown.classList.remove("hide");
    input.setAttribute("aria-expanded", "true");
    loadSavedCities(dropdown);
})
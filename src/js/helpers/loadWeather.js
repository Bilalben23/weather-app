import fetchWeather from "../api/fetchWeather";
import updateDom from "../ui/domUpdater";
import showCityNotFoundError from "../ui/showCityNotFoundError";
import showGeneralError from "../ui/showGeneralError";
import showLoading from "../ui/showLoading";

let settings = JSON.parse(localStorage.getItem("weatherSettings")) || {
    temperature: "celsius",
    windSpeed: "kmh",
    precipitation: "mm"
}

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


export default loadWeather;
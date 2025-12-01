import fetchWeather from "../api/fetchWeather";
import updateDom from "../ui/updateDom";
import showCityNotFoundError from "../ui/showCityNotFoundError";
import showGeneralError from "../ui/showGeneralError";
import showLoading from "../ui/showLoading";
import loadUserPreferences from "./loadUserPreferences";


async function loadWeather(cityName) {
    const settings = loadUserPreferences();
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
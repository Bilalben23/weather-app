import getCoordinates from "./getCoordinates";
import saveCityToLocalStorage from "../helpers/saveCityToLocalStorage";

async function fetchWeather(cityName, settings) {
    const city = await getCoordinates(cityName);

    const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true&timezone=auto&temperature_unit=${settings.temperature}&windspeed_unit=${settings.windSpeed}&precipitation_unit=${settings.precipitation}&hourly=temperature_2m,apparent_temperature,relativehumidity_2m,precipitation,wind_speed_10m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch weather data");

    saveCityToLocalStorage(cityName);

    const data = await response.json();
    return { city: city.name, weather: data };
}

export default fetchWeather;
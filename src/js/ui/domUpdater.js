import weatherCodeToDescription from "../helpers/weatherCodeToDescription";
import weatherCodeToIcon from "../helpers/weatherCodeToIcon";
import renderHourlyForecast from "./renderHourlyForecast";
import renderWeeklyForecast from "./renderWeeklyForecast";

function updateDom(data) {
  const { city, weather } = data;

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
  iconEl.alt = weatherCodeToDescription(current.weathercode);
  tempEl.innerHTML = `${Math.round(current.temperature)}${currentWeatherUnits.temperature}`


  // ========================
  // 4. details
  // ========================
  const firstIndex = 0;

  feelsEl.innerHTML = `${Math.round(hourly.apparent_temperature[firstIndex])}${hourlyUnits.apparent_temperature}`;
  humidityEl.textContent = `${hourly.relativehumidity_2m[firstIndex]}${hourlyUnits.relativehumidity_2m}`;
  windEl.textContent = `${Math.round(current.windspeed)} ${hourlyUnits.wind_speed_10m}`;
  precipitationEl.textContent = `${hourly.precipitation[firstIndex]} ${hourlyUnits.precipitation}`;


  renderHourlyForecast(hourly, hourlyUnits);

  renderWeeklyForecast(daily, dailyUnits);
}


export default updateDom;
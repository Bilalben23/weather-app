import weatherCodeToDescription from "../helpers/weatherCodeToDescription";
import weatherCodeToIcon from "../helpers/weatherCodeToIcon";
import renderHourlyForecast from "./renderHourlyForecast";
import renderWeeklyForecast from "./renderWeeklyForecast";
import updateDetailsUnits from "./updateDetailsUnits";
import { setHourlyData } from "../helpers/hourlyState";
import getDayOfWeek from "../helpers/getDayOfWeek";

function updateDom(data) {
  const { city, weather } = data;

  // ========================
  // 1. Basic DOM elements
  // ========================
  const cityEl = document.querySelector(".weather__city");
  const dateEl = document.querySelector(".weather__date");
  const iconEl = document.querySelector(".weather__icon");
  const tempEl = document.querySelector(".weather__temp em")
  const dayBtn = document.getElementById("day-dropdown-btn");

  const current = weather.current_weather;
  const currentUnits = weather.current_weather_units;
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
  tempEl.innerHTML = `${Math.round(current.temperature)}${currentUnits.temperature}`


  updateDetailsUnits(current, currentUnits, hourly, hourlyUnits)

  dayBtn.querySelector("span").textContent = getDayOfWeek(hourly.time[0]);
  renderHourlyForecast(hourly, hourlyUnits);
  setHourlyData(hourly, hourlyUnits);

  renderWeeklyForecast(daily, dailyUnits);
}


export default updateDom;
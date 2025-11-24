import formatDay from "../helpers/formatDay";
import formatHour from "../helpers/formatHour";
import weatherCodeToDescription from "../helpers/weatherCodeToDescription";
import weatherCodeToIcon from "../helpers/weatherCodeToIcon";


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


    // ========================
    // 5. Hourly forecast (first 8)
    // ========================

    hourlyList.innerHTML = "";

    for (let i = 0; i < 8; i++) {
        const hTime = hourly.time[i];
        const hTemp = hourly.temperature_2m[i];
        const hIcon = weatherCodeToIcon(hourly.weathercode[i]);
        const altText = weatherCodeToDescription(hourly.weathercode[i]);

        hourlyList.innerHTML += `
             <div class="hourly__item">
              <div class="hourly__time-block">
                <img
                  class="hourly__icon"
                  src="${hIcon}"
                  alt="${altText}"
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
        const altText = weatherCodeToDescription(daily.weathercode[i]);

        weeklyList.innerHTML += `
            <div class="weekly__item">
              <p class="weekly__day">${formatDay(day)}</p>
              <img
                class="weekly__icon"
                src="${icon}"
                alt="${altText}"
              />
              <div class="weekly_temps">
                <p class="weekly__high">${Math.round(maxTemp)}${dailyUnits.temperature_2m_max}</p>
                <p class="weekly__low">${Math.round(minTemp)}${dailyUnits.temperature_2m_min}</p>
              </div>
            </div>
        `
    })

}


export default updateDom;
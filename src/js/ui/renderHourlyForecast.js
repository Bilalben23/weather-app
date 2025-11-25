import formatHour from "../helpers/formatHour";
import weatherCodeToDescription from "../helpers/weatherCodeToDescription";
import weatherCodeToIcon from "../helpers/weatherCodeToIcon";

function renderHourlyForecast(hourly, hourlyUnits) {
    const hourlyList = document.querySelector(".hourly__list");
    const template = document.getElementById("hourly_item-template");

    hourlyList.innerHTML = "";

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 8; i++) {
        const hTime = hourly.time[i];
        const hTemp = hourly.temperature_2m[i];
        const hIcon = weatherCodeToIcon(hourly.weathercode[i]);
        const altText = weatherCodeToDescription(hourly.weathercode[i]);

        const clone = template.content.cloneNode(true);

        const imgEl = clone.querySelector(".hourly__icon");
        imgEl.src = hIcon;
        imgEl.alt = altText;
        clone.querySelector(".hourly__time").textContent = formatHour(hTime);
        clone.querySelector(".hourly__temp").textContent = `${Math.round(hTemp)}${hourlyUnits.apparent_temperature}`;

        fragment.appendChild(clone);
    }

    hourlyList.appendChild(fragment);
}


export default renderHourlyForecast;

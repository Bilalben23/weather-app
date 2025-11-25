import formatDay from "../helpers/formatDay";
import weatherCodeToDescription from "../helpers/weatherCodeToDescription";
import weatherCodeToIcon from "../helpers/weatherCodeToIcon";

function renderWeeklyForecast(daily, dailyUnits) {
    const weeklyList = document.querySelector(".weekly__list");
    const template = document.getElementById("weekly_item-template");

    weeklyList.innerHTML = "";

    const fragment = document.createDocumentFragment();

    daily.time.forEach((day, i) => {
        const maxTemp = daily.temperature_2m_max[i];
        const minTemp = daily.temperature_2m_min[i];
        const icon = weatherCodeToIcon(daily.weathercode[i]);
        const altText = weatherCodeToDescription(daily.weathercode[i]);

        const clone = template.content.cloneNode(true);

        clone.querySelector(".weekly__day").textContent = formatDay(day);
        const imgEl = clone.querySelector(".weekly__icon");
        imgEl.src = icon;
        imgEl.alt = altText;
        clone.querySelector(".weekly__high").textContent = `${Math.round(maxTemp)}${dailyUnits.temperature_2m_max}`;
        clone.querySelector(".weekly__low").textContent = `${Math.round(minTemp)}${dailyUnits.temperature_2m_min}`;

        fragment.appendChild(clone);
    })

    weeklyList.appendChild(fragment);
}


export default renderWeeklyForecast;

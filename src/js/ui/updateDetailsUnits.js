function updateDetailsUnits(current, currentUnits, hourly, hourlyUnits) {
    const firstIndex = 0;
    const feelsLike = document.querySelector(".details__feels-like");
    const humidity = document.querySelector(".details__humidity");
    const wind = document.querySelector(".details__wind");
    const precipitation = document.querySelector(".details__precipitation");

    const feelsVal = `${Math.round(hourly.apparent_temperature[firstIndex])}${hourlyUnits.apparent_temperature}`;
    const humidityVal = `${hourly.relativehumidity_2m[firstIndex]}${hourlyUnits.relativehumidity_2m}`;
    const windVal = `${Math.round(current.windspeed)} ${currentUnits.windspeed}`;
    const precipitationVal = `${hourly.precipitation[firstIndex]} ${hourlyUnits.precipitation}`;

    feelsLike.textContent = feelsVal;
    feelsLike.dataset.realValue = feelsVal;

    humidity.textContent = humidityVal;
    humidity.dataset.realValue = humidityVal;

    wind.textContent = windVal;
    wind.dataset.realValue = windVal;

    precipitation.textContent = precipitationVal;
    precipitation.dataset.realValue = precipitationVal;
}


export default updateDetailsUnits;
function updateDetailsUnits(current, currentUnits, hourly, hourlyUnits) {
    const firstIndex = 0;
    document.querySelector(".details__feels-like").innerHTML = `${Math.round(hourly.apparent_temperature[firstIndex])}${hourlyUnits.apparent_temperature}`;
    document.querySelector(".details__humidity").textContent = `${hourly.relativehumidity_2m[firstIndex]}${hourlyUnits.relativehumidity_2m}`;
    document.querySelector(".details__wind").textContent = `${Math.round(current.windspeed)} ${currentUnits.windspeed}`;
    document.querySelector(".details__precipitation").textContent = `${hourly.precipitation[firstIndex]} ${hourlyUnits.precipitation}`;
}


export default updateDetailsUnits;
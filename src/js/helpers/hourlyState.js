let currentHourlyData = null;
let currentHourlyUnits = null;

export function setHourlyData(hourly, units) {
    currentHourlyData = hourly;
    currentHourlyUnits = units;
}


export function getHourlyData() {
    return {
        hourly: currentHourlyData,
        units: currentHourlyUnits
    }
}
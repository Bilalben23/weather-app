async function getCoordinates(cityName) {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;

    const response = await fetch(geoUrl);
    if (!response.ok) throw new Error("Failed ro fetch coordinates");

    const data = await response.json();
    if (!data.results || data.results.length === 0) {
        console.error(`${cityName} City Not found!`);
        const error = new Error("City Not found");
        error.code = "CITY_NOT_FOUND";
        throw error;
    }

    const { latitude, longitude, name, country } = data.results[0];
    return { lat: latitude, lon: longitude, name: `${name}, ${country}` };
}

export default getCoordinates;
function saveCityToLocalStorage(cityName) {
    let cities = JSON.parse(localStorage.getItem("cities")) || [];

    cities = cities.filter(c => c !== cityName.toLowerCase())

    cities.unshift(cityName.trim().toLowerCase());

    cities = cities.slice(0, 6);

    localStorage.setItem("cities", JSON.stringify(cities));
}

export default saveCityToLocalStorage;
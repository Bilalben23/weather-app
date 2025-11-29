function loadUserPreferences() {
    const stored = localStorage.getItem("userUnits");

    if (stored) {
        return JSON.parse(stored);
    }

    return {
        temperature: "celsius",
        windSpeed: "kmh",
        precipitation: "mm"
    }
}

export default loadUserPreferences;
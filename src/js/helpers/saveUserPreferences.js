function saveUserPreferences(preferences) {
    localStorage.setItem("userUnits", JSON.stringify(preferences));
}

export default saveUserPreferences;
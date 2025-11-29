import applyUserPreferencesToUI from "../ui/applyUserPreferencesToUI";
import getSafeLocalArray from "./getSafeLocalArray";
import loadUserPreferences from "./loadUserPreferences";
import loadWeather from "./loadWeather";
import saveUserPreferences from "./saveUserPreferences";


function handleUnitSelection(btn) {
    const group = btn.closest("[role='group']");
    const groupLabel = group.getAttribute("aria-label");
    const unitValue = btn.dataset.unit;

    const oldPrefs = loadUserPreferences();
    const newPrefs = structuredClone(oldPrefs);

    if (groupLabel === "Temperature Units") {
        newPrefs.temperature = unitValue;
    } else if (groupLabel == "Wind Speed Units") {
        newPrefs.windSpeed = unitValue;
    } else if (groupLabel === "Precipitation Speed Units") {
        newPrefs.precipitation = unitValue
    }

    const unchanged =
        oldPrefs.temperature === newPrefs.temperature &&
        oldPrefs.windSpeed === newPrefs.windSpeed &&
        oldPrefs.precipitation === newPrefs.precipitation

    if (unchanged) return;

    saveUserPreferences(newPrefs);
    applyUserPreferencesToUI();

    const cities = getSafeLocalArray("cities");
    const lastCity = cities[0] || null;
    const cityToLoad = lastCity || "Rabat";

    loadWeather(cityToLoad);
}

export default handleUnitSelection;
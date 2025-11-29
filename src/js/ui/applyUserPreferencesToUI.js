import loadUserPreferences from "../helpers/loadUserPreferences";
import updateUnitGroupUI from "./updateUnitGroupUI";

function applyUserPreferencesToUI() {
    const prefs = loadUserPreferences();

    updateUnitGroupUI(
        "[aria-label='Temperature Units']",
        prefs.temperature
    );

    updateUnitGroupUI(
        "[aria-label='Wind Speed Units']",
        prefs.windSpeed
    )

    updateUnitGroupUI(
        "[aria-label='Precipitation Speed Units']",
        prefs.precipitation
    )
}

export default applyUserPreferencesToUI;
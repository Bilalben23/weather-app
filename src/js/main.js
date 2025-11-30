import initUnitsDropdown from "./ui/initUnitsDropdown";
import initDayDropdown from "./ui/initDayDropdown";
import loadSavedCities from "./ui/loadSavedCities";
import getSafeLocalArray from "./helpers/getSafeLocalArray";
import loadWeather from "./helpers/loadWeather";
import closeFormDropdown from "./helpers/closeFormDropdown";
import applyUserPreferencesToUI from "./ui/applyUserPreferencesToUI";


initUnitsDropdown();
initDayDropdown();

const form = document.querySelector("form");
const input = form.querySelector("#search_input");
const searchDropdown = document.getElementById("search-dropdown");


window.addEventListener("DOMContentLoaded", () => {
    applyUserPreferencesToUI();

    const cities = getSafeLocalArray("cities");
    const lastCity = cities[0] || null;
    const cityToLoad = lastCity || "Rabat";

    loadWeather(cityToLoad);
})


form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const cityName = input.value.trim();
    if (!cityName) return;

    loadWeather(cityName);
})

input.addEventListener("focus", () => {
    searchDropdown.classList.remove("hide");
    input.setAttribute("aria-expanded", "true");
    loadSavedCities(searchDropdown);
})


input.addEventListener("input", () => closeFormDropdown(searchDropdown, input));

searchDropdown.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn || !searchDropdown.contains(btn)) return;

    const cityName = btn.textContent;

    input.value = cityName;
    input.setAttribute("aria-activedescendant", btn.parentElement.id);
    loadWeather(cityName)
    closeFormDropdown(searchDropdown, input);
})


document.addEventListener("click", (e) => {
    if (form.contains(e.target)) return;
    closeFormDropdown(searchDropdown, input);
})
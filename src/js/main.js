import initDropdown from "./ui/initDropdown";
import loadSavedCities from "./ui/loadSavedCities";
import getSafeLocalArray from "./helpers/getSafeLocalArray";
import loadWeather from "./helpers/loadWeather";
import closeFormDropdown from "./helpers/closeFormDropdown";

initDropdown();

const form = document.querySelector("form");
const input = form.querySelector("#search_input");
const dropdown = document.querySelector("#search-dropdown");


window.addEventListener("DOMContentLoaded", () => {
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
    dropdown.classList.remove("hide");
    input.setAttribute("aria-expanded", "true");
    loadSavedCities(dropdown);
})


input.addEventListener("input", () => closeFormDropdown(dropdown, input));

dropdown.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn || !dropdown.contains(btn)) return;

    const cityName = btn.textContent;

    input.value = cityName;
    input.setAttribute("aria-activedescendant", btn.parentElement.id);
    loadWeather(cityName)
    closeFormDropdown(dropdown, input);
})


document.addEventListener("click", (e) => {
    if (form.contains(e.target)) return;
    closeFormDropdown(dropdown, input);
})
import { getHourlyData } from "../helpers/hourlyState";
import getDayOfWeek from "../helpers/getDayOfWeek";
import renderHourlyForecast from "./renderHourlyForecast";


function initDayDropdown() {
    const dayBtn = document.getElementById("day-dropdown-btn");
    const dayDropdown = document.getElementById("day-dropdown-list");
    const chevron = dayBtn.querySelector(".units-btn__icon-chevron");
    let isOpen = false;

    function openMenu() {
        dayDropdown.classList.remove("hide");
        dayBtn.setAttribute("aria-expanded", "true");
        chevron.classList.add("rotate-icon");
        isOpen = true;
    }

    function closeMenu() {
        dayDropdown.classList.add("hide");
        dayBtn.setAttribute("aria-expanded", "false");
        chevron.classList.remove("rotate-icon");
        isOpen = false;
    }

    dayBtn.addEventListener("click", () => isOpen ? closeMenu() : openMenu());

    dayDropdown.addEventListener("click", (e) => {
        const btn = e.target.closest(".hourly__day-option");

        if (!btn) return;

        const dayText = btn.textContent;
        dayBtn.querySelector("span").textContent = dayText;

        const { hourly, units } = getHourlyData();
        if (!hourly || !units) return;

        const filteredHourly = {};
        Object.keys(hourly).forEach(key => {
            filteredHourly[key] = hourly[key].filter((_, i) => {
                return getDayOfWeek(hourly.time[i]) === dayText.trim();
            });
        });

        renderHourlyForecast(filteredHourly, units);
        closeMenu();
    })


    document.addEventListener("click", (e) => {
        if (!dayBtn.contains(e.target) && !dayDropdown.contains(e.target)) {
            if (isOpen) closeMenu();
        }
    })

    dayBtn.addEventListener("focus", () => {
        if (!isOpen) openMenu();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isOpen) closeMenu();
    })
}

export default initDayDropdown;
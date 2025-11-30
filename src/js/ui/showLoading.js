function showLoading(isLoading) {
    const searchBtn = document.querySelector(".search-form__btn");
    const searchInput = document.getElementById("search_input");

    // content sections
    const currentWeather = document.querySelector(".weather__current");
    const currentLoading = document.querySelector(".weather__current-loading");

    // Day dropdown elements
    const dayBtn = document.getElementById("day-dropdown-btn");
    const daySpan = dayBtn?.querySelector("span");
    const dayOptions = document.querySelectorAll(".hourly__day.option");

    const hourlyList = document.querySelector(".hourly__list");
    const hourlyLoading = document.querySelector(".hourly__list-loading");

    const weeklyList = document.querySelector(".weekly__list");
    const weeklyLoading = document.querySelector(".weekly__list-loading");

    const weatherDetails = document.querySelectorAll(".weather__details .details_item");
    const detailsItems = document.querySelectorAll(".details_item p:not(.details__label)");

    // Disabled / enable from elements
    searchBtn.disabled = isLoading;
    searchInput.disabled = isLoading;


    if (dayBtn) dayBtn.disabled = isLoading

    dayOptions.forEach(opt => {
        opt.setAttribute("aria-disabled", isLoading ? "true" : "false");
        opt.tabIndex = isLoading ? -1 : 0;
    })

    if (daySpan) {
        if (isLoading) {
            dayBtn.dataset.realDay = daySpan.textContent;
            daySpan.textContent = "-";
        } else {
            const saved = dayBtn.dataset.realDay;
            if (saved) daySpan.textContent = saved;
        }
    }

    // Toggle button text
    searchBtn.textContent = isLoading ? "Loading..." : "Search";

    // Toggle current weather section
    currentWeather.classList.toggle("hide", isLoading);
    currentLoading.classList.toggle("hide", !isLoading);

    // Toggle hourly forecast
    hourlyList.classList.toggle("hide", isLoading);
    hourlyLoading.classList.toggle("hide", !isLoading);

    // Toggle weekly forecast
    weeklyList.classList.toggle("hide", isLoading);
    weeklyLoading.classList.toggle("hide", !isLoading);

    // 
    weatherDetails.forEach((item, index) => {
        if (isLoading) {
            item.classList.add("shimmer");
            detailsItems[index].dataset.realValue = detailsItems[index].textContent;
            detailsItems[index].textContent = "-";
        } else {
            detailsItems[index].textContent = detailsItems[index].dataset.realValue || detailsItems[index].textContent;
            item.classList.remove("shimmer");
        }
    })
}

export default showLoading;
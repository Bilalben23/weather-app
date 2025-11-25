function showLoading(isLoading) {
    const searchBtn = document.querySelector(".search-form__btn");
    const searchInput = document.querySelector("#search_input");

    // content sections
    const currentWeather = document.querySelector(".weather__current");
    const currentLoading = document.querySelector(".weather__current-loading");

    const hourlyList = document.querySelector(".hourly__list");
    const hourlyLoading = document.querySelector(".hourly__list-loading");

    const weeklyList = document.querySelector(".weekly__list");
    const weeklyLoading = document.querySelector(".weekly__list-loading");

    const weatherDetails = document.querySelectorAll(".weather__details .details_item");
    const detailsItems = document.querySelectorAll(".details_item p:not(.details__label)");

    // Disabled / enable from elements

    searchBtn.disabled = isLoading;
    searchInput.disabled = isLoading;

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
function showCityNotFoundError(show = true) {
    const errorContainer = document.querySelector(".error");
    const weatherContainer = document.querySelector(".weather");

    errorContainer.classList.toggle("hide", !show);
    weatherContainer.classList.toggle("hide", show);
}


export default showCityNotFoundError;
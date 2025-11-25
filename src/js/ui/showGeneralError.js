function showGeneralError(show = true, msg = "") {
    const errorContainer = document.querySelector(".general-error");
    const mainContentContainer = document.querySelector("main");

    errorContainer.classList.toggle("hide", !show);
    mainContentContainer.classList.toggle("hide", show);
}


export default showGeneralError;
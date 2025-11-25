function closeFormDropdown(dropdown, input) {
    dropdown.classList.add("hide");
    input.setAttribute("aria-expanded", "false");
}

export default closeFormDropdown;
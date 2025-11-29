function updateUnitGroupUI(groupSelector, selectedValue) {
    const options = document.querySelectorAll(`${groupSelector} .unit-menu__option`);

    options.forEach(btn => {
        const unit = btn.dataset.unit;
        const checkIcon = btn.querySelector("img");

        const isSelected = unit === selectedValue;

        btn.setAttribute("aria-selected", isSelected ? "true" : "false");
        checkIcon.classList.toggle("hide", !isSelected);
    })
}

export default updateUnitGroupUI;
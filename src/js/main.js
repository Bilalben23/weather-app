const unitsBtn = document.querySelector(".units-btn");
const unitsDropdown = document.querySelector("#units-dropdown-list");
const dropdownItems = unitsDropdown.querySelectorAll("button");
const unitsBtnIconChevron = document.querySelector(".units-btn__icon-chevron")
console.log(unitsBtnIconChevron);

let isOpen = false;

function openMenu() {
    unitsDropdown.classList.remove("hide");
    unitsBtn.setAttribute("aria-expanded", "true");
    unitsBtnIconChevron.classList.add("rotate-icon");
    isOpen = true;
}

function closeMenu() {
    unitsDropdown.classList.add("hide");
    unitsBtn.setAttribute("aria-expanded", "false");
    unitsBtnIconChevron.classList.remove("rotate-icon");
    isOpen = false;
}

// toggle dropdown on button click
unitsBtn.addEventListener("click", () => {
    isOpen ? closeMenu() : openMenu();
})

unitsBtn.addEventListener("focus", (e) => {
    if (!isOpen) openMenu();
})


document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        if (isOpen) {
            closeMenu()
        };
    }
})
import handleUnitSelection from "../helpers/handleUnitSelection";

function initUnitsDropdown() {
    const unitsBtn = document.querySelector(".units-btn");
    const unitsDropdown = document.getElementById("units-dropdown-list");
    const unitsBtnIconChevron = document.querySelector(".units-btn__icon-chevron");
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

    unitsBtn.addEventListener("click", () => isOpen ? closeMenu() : openMenu());


    document.addEventListener("click", (e) => {
        if (!unitsBtn.contains(e.target) && !unitsDropdown.contains(e.target)) {
            if (isOpen) closeMenu();
        }
    })

    unitsBtn.addEventListener("focus", () => {
        if (!isOpen) openMenu();
    });

    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && isOpen) closeMenu();
    });


    unitsDropdown.addEventListener("click", (e) => {
        const btn = e.target.closest(".unit-menu__option");
        if (!btn) return;
        handleUnitSelection(btn);
    })
}


export default initUnitsDropdown;
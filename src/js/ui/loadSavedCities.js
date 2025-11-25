function loadSavedCities(dropdown) {
    const template = document.querySelector("#search-dropdown-item-template");

    const cities = JSON.parse(localStorage.getItem("cities")) || [];

    dropdown.innerHTML = "";
    if (cities.length === 0) {
        const emptyMsg = document.createElement("li");
        emptyMsg.textContent = "No recent cities";
        emptyMsg.classList = "search-form__dropdown-item empty";
        dropdown.appendChild(emptyMsg);
        return;
    }

    const fragment = document.createDocumentFragment();

    cities.forEach((city, i) => {
        const clone = template.content.cloneNode(true);
        const item = clone.querySelector("li");
        const btn = clone.querySelector("button");
        item.id = `option-${i + 1}`;
        btn.textContent = city;
        fragment.appendChild(clone);
    })

    dropdown.appendChild(fragment);
}

export default loadSavedCities;
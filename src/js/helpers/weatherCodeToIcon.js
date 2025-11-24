function weatherCodeToIcon(code) {
    const icons = {
        0: "sun.svg",
        1: "sun.svg",
        2: "partly-cloud.svg",
        3: "cloud.svg",

        45: "fog.svg",
        48: "fog.svg",

        51: "light-rain.svg",
        53: "light-rain.svg",
        55: "light-rain.svg",

        61: "light-rain.svg",
        63: "rain.svg",
        65: "rain.svg",

        71: "snow.svg",
        73: "snow.svg",
        75: "heavy-snow.svg",

        80: "light-rain.svg",
        81: "rain.svg",
        82: "rain-thunder.svg",

        95: "rain-thunder.svg",
        96: "light-rain-thunder.svg",
        99: "heavy-snow-thunder-sun.svg",
    };

    return `/src/assets/icons/${icons[code] || "sun.svg"}`;
}

export default weatherCodeToIcon;
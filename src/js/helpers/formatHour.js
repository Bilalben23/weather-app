function formatHour(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
        hour: "numeric",
        hour12: true
    })
}


export default formatHour;
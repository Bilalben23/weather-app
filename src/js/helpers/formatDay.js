function formatDay(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString([], {
        weekday: "short"
    })
}


export default formatDay;
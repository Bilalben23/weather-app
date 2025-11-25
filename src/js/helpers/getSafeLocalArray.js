/**
 * 
 * @param {string} key - The LocalStorage key.
 * @param {Array} defaultValue - Default value if key doesn't exist or is invalid. 
 * @returns {Array} - The parsed array or default value.
 */

function getSafeLocalArray(key, defaultValue = []) {
    const stored = localStorage.getItem(key);

    if (!stored) return defaultValue;

    try {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : defaultValue;
    } catch (err) {
        return defaultValue;
    }
}


export default getSafeLocalArray;
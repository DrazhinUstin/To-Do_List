const getStorageItem = (key) => {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
};

const setStorageItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export { getStorageItem, setStorageItem };

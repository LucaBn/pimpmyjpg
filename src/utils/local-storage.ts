type LocalStorageDataType = unknown;

/**
 * Writes data to localStorage.
 *
 * @param {string} key - The key under which to store the data.
 * @param {LocalStorageDataType} data - The data to be stored in localStorage.
 * @returns {void}
 */
const writeToLocalStorage = (key: string, data: LocalStorageDataType): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error writing to localStorage:", error);
  }
};

/**
 * Reads data from localStorage.
 *
 * @param {string} key - The key under which the data is stored.
 * @returns {LocalStorageDataType} - The data retrieved from localStorage.
 */
const readFromLocalStorage = (key: string): LocalStorageDataType => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return null;
  }
};

/**
 * Removes data from localStorage.
 *
 * @param {string} key - The key under which the data is stored.
 * @returns {void}
 */
const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
};

export { writeToLocalStorage, readFromLocalStorage, removeFromLocalStorage };

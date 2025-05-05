/**
 * MockDataSource class
 * Simulates a data storage provider for testing
 */
class MockDataSource {
  constructor() {
    this.mockData = {};
  }

  /**
   * Set data for a key
   * @param {string} key - The key to store data under
   * @param {any} data - The data to store
   */
  setData(key, data) {
    // Create a deep copy to prevent reference issues
    this.mockData[key] = JSON.parse(JSON.stringify(data));
  }

  /**
   * Get data for a key
   * @param {string} key - The key to retrieve data for
   * @returns {any} - The retrieved data or null if not found
   */
  getData(key) {
    if (this.mockData[key] === undefined) {
      return null;
    }

    // Return a deep copy to prevent reference issues
    return JSON.parse(JSON.stringify(this.mockData[key]));
  }

  /**
   * Delete data for a key
   * @param {string} key - The key to delete data for
   */
  deleteData(key) {
    delete this.mockData[key];
  }

  /**
   * Clear all stored data
   */
  clearAll() {
    this.mockData = {};
  }

  /**
   * Get all stored data (for debugging)
   * @returns {Object} - All stored data
   */
  getAllData() {
    return JSON.parse(JSON.stringify(this.mockData));
  }
}

// Create and export a singleton instance
const mockDataSource = new MockDataSource();

export { mockDataSource };
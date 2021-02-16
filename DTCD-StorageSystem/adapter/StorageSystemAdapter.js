import { BaseAdapter } from './BaseAdapter';

export class StorageSystemAdapter extends BaseAdapter {
  /**
   * Initialize StorageSystemAdapter instance.
   * @constructor
   */
  constructor() {
    super();
    this.instance = this.getSystem('StorageSystem');
  }

  /**
   * Create a new record in storage.
   * @method
   * @param {string} key Record key name.
   * @param {*} value Record stored value.
   */
  addRecord(key, value) {
    this.instance.addRecord(key, value);
  }

  /**
   * Replace record value by key or create a new record to storage.
   * @method
   * @param {string} key Record key name.
   * @param {*} value Record stored value.
   */
  putRecord(key, value) {
    this.instance.putRecord(key, value);
  }

  /**
   * Check for a record in the storage.
   * @method
   * @param {string} key Record key name.
   * @returns {boolean} Returns true if record exists in storage.
   */
  hasRecord(key) {
    return this.instance.hasRecord(key);
  }

  /**
   * Get record value from storage by key.
   * @method
   * @param {string} key Record key name.
   * @returns {*} Storage record value.
   */
  getRecord(key) {
    return this.instance.getRecord(key);
  }

  /**
   * Delete record from storage by key.
   * @method
   * @param {string} key Record key name.
   * @returns {string} Operation result.
   */
  removeRecord(key) {
    return this.instance.removeRecord(key);
  }

  /**
   * Removing all records from storage.
   * @method
   * @returns {string} Operation result.
   */
  clearStorage() {
    return this.instance.clearStorage();
  }
}

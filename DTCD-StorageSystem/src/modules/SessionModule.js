import { BaseModule } from './_BaseModule';
import { RecordDuplicateError } from '@/utils/errors/recordErrors';

/**
 * Storage system session module class.
 * @class @extends BaseModule
 */
export class SessionModule extends BaseModule {

  /**
   * Private JavaScript Map object instance.
   * @property @private
   */
  #state = new Map();

  /**
   * StorageSystem name.
   * @property @private
   */
  #storage;

  /**
   * Private instance of the LogSystemAdapter class.
   * @property @private
   */
  #logSystem;

  /**
   * Initialize SessionModule instance.
   * @constructor
   * @param {string} storage StorageSystem name.
   * @param {Object} logSystem StorageSystem`s LogSystemAdapter instance.
   */
  constructor (storage, logSystem) {
    super();
    this.#storage = storage;
    this.#logSystem = logSystem;
    this.#logSystem.debug(`${this.#storage} --> new SessionModule()`);
    this.#logSystem.info(`${this.#storage} session module: initialization complete`);
  }

  /**
   * Helper method for `addRecord()` and `putRecord()` public methods.
   * @method @private
   * @param {string} key Record key name.
   * @param {*} value Record value.
   * @param {boolean} checkUnique Check record key uniqueness.
   */
  #setRecord (key, value, checkUnique = false) {
    try {
      const addedKey = BaseModule.checkRecordKey(key);
      const addedValue = BaseModule.checkRecordValue(value);

      if (checkUnique && this.hasRecord(addedKey)) {
        throw new RecordDuplicateError(addedKey);
      }

      this.#state.set(addedKey, addedValue);
      this.#logSystem.debug(`${this.#storage} SessionModule state: SET "${addedKey}" => ${addedValue}`);

      return addedKey;
    } catch (err) {
      this.#logSystem.debug(`${this.#storage} SessionModule: ${err.stack}`);
      this.#logSystem.info(`${this.#storage} session module ${err.message}`);
      throw err;
    }
  }

  /**
   * Create a new record.
   * @method @public @override
   * @param {string} key Record key name.
   * @param {*} value Record value.
   * @returns {SessionModule} This SessionModule instance.
   */
  addRecord (key, value) {
    const settedKey = this.#setRecord(key, value, true);
    this.#logSystem.info(`${this.#storage} session module: added "${settedKey}" record`);
    return this;
  }

  /**
   * Replace record value by key or create a new record.
   * @method @public @override
   * @param {string} key Record key name.
   * @param {*} value Record value.
   * @returns {SessionModule} This SessionModule instance.
   */
  putRecord (key, value) {
    const settedKey = this.#setRecord(key, value);
    this.#logSystem.info(`${this.#storage} session module: putted "${settedKey}" record`);
    return this;
  }

  /**
   * Get record value by key.
   * @method @public @override
   * @param {string} key Record key name.
   * @returns {*} Record value.
   */
  getRecord (key) {
    this.#logSystem.debug(`${this.#storage} SessionModule state --> get(${key})`);
    return this.#state.get(key);
  }

  /**
   * Check record existence by key.
   * @method @public @override
   * @param {string} key Record key name.
   * @returns {number} Record existence.
   */
  hasRecord (key) {
    this.#logSystem.debug(`${this.#storage} SessionModule state --> has(${key})`);
    return this.#state.has(key);
  }

  /**
   * Delete record by key.
   * @method @public @override
   * @param {string} key Record key name.
   * @returns {boolean} Success of record deletion.
   */
  removeRecord (key) {
    this.#logSystem.debug(`${this.#storage} SessionModule state --> delete(${key})`);
    return this.#state.delete(key);
  }

  /**
   * Delete all records.
   * @method @public @override
   * @returns {number} Number of deleted records.
   */
  clearModule () {
    this.#logSystem.debug(`${this.#storage} SessionModule state --> clear()`);
    const countBeforeClear = this.recordCount;
    this.#state.clear();
    return countBeforeClear;
  }

  /**
   * Number of module records.
   * @property @public
   * @returns {number} Number of records.
   */
  get recordCount () {
    return this.#state.size;
  }

  /**
   * List of module records keys.
   * @property @public
   * @returns {string[]} Array of records keys.
   */
  get recordList () {
    return Array.from(this.#state.keys());
  }

}

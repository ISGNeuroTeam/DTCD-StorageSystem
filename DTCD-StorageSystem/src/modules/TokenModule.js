import SessionModuleScope from './SessionModule/SessionModuleScope';

/**
 * Storage system token module class.
 * @class @extends SessionModuleScope
 */
export class TokenModule extends SessionModuleScope {

  /**
   * Private instance of the LogSystemAdapter class.
   * @property @private
   */
  #logSystem;

  /**
   * Map object instance that contains default values.
   * @property @private
   */
  #stateDefaultValues = new Map();

  /**
   * Private instance of the EventSystemAdapter class.
   * @property @private
   */
  #eventSystem;

  /**
   * Initialize TokenModule instance.
   * @constructor
   * @param {string} storage StorageSystem name.
   * @param {Object} logSystem StorageSystem`s LogSystemAdapter instance.
   * @param {Object} eventSystem StorageSystem`s EventSystemAdapter instance.
   */
  constructor(storage, logSystem, eventSystem) {
    super(storage, logSystem);
    this.#logSystem = logSystem;
    this.#eventSystem = eventSystem;
  }

  /**
   * Create a new record.
   * @public @override
   * @param {string} key Record key name.
   * @param {*} value Record value.
   * @param {*} [defaultValue] Record default value.
   * @returns {TokenModule} This TokenModule instance.
   */
  addRecord(key, value, defaultValue) {
    super.addRecord(key, value);
    
    if (defaultValue !== null && defaultValue !== undefined) {
      this.setDefaultRecord(key, defaultValue);
    }
    
    this.#eventSystem.publishEvent('TokenUpdate', { token: key });
    return this;
  }

  /**
   * Replace record value by key or create a new record.
   * @public @override
   * @param {string} key Record key name.
   * @param {*} value Record value.
   * @param {*} [defaultValue] Record default value.
   * @returns {TokenModule} This TokenModule instance.
   */
  putRecord(key, value, defaultValue) {
    super.putRecord(key, value);
    
    if (defaultValue !== null && defaultValue !== undefined) {
      this.setDefaultRecord(key, defaultValue);
    }
    
    this.#eventSystem.publishEvent('TokenUpdate', { token: key });
    return this;
  }

  /**
   * Get record value by key. If no record value in state then default value will be returned.
   * @public @override
   * @param {string} key Record key name.
   * @returns {*} Record value.
   */
  getRecord (key) {
    const stateMainValue = super.getRecord(key);

    if (stateMainValue === undefined) {
      return this.getDefaultRecord(key);
    } else {
      return stateMainValue;
    }
  }

  /**
   * Check record existence by key in state and in state default values. 
   * @method @public @override
   * @param {string} key Record key name.
   * @returns {boolean} Record existence.
   */
  hasRecord (key) {
    return super.hasRecord(key) || this.#stateDefaultValues.has(key);
  }

  /**
   * Delete record by key.
   * @method @public @override
   * @param {string} key Record key name.
   * @returns {boolean} Success of record deletion.
   */
  removeRecord (key) {
    const result = super.removeRecord(key);
    this.#eventSystem.publishEvent('TokenUpdate', { token: key });
    return result;
  }

  /**
   * Replace record value by key or create a new record to state default values.
   * @public
   * @param {string} key Record key name.
   * @param {*} value Record value.
   */
  setDefaultRecord (key, value) {
    this.#stateDefaultValues.set(key, value);
    this.#logSystem.info(`${this.storage} module: setted "${key}" record to state default values`);
  }

  /**
   * Get record with default value by key.
   * @public
   * @param {string} key Record key name.
   * @returns {*} Record value.
   */
  getDefaultRecord (key) {
    this.#logSystem.debug(`${this.storage} state default values --> get(${key})`);
    return this.#stateDefaultValues.get(key);
  }

  /**
   * Delete record by key in state default values.
   * @method @public @override
   * @param {string} key Record key name.
   * @returns {boolean} Success of record deletion.
   */
  removeDefaultRecord (key) {
    this.#logSystem.debug(`${this.storage} state default values --> delete(${key})`);
    return this.#stateDefaultValues.delete(key);
  }

  get stateDefaultValues() {
    return Array.from(this.#stateDefaultValues.entries());
  }

  setConfig(config = {}) {
    const {
      tokens,
      defaultTokens,
    } = config;

    if (tokens) {
      for (const [key, value] of tokens) {
        this.addRecord(key, value);
      }
    }
    if (defaultTokens) {
      for (const [key, value] of defaultTokens) {
        this.setDefaultRecord(key, value);
      }
    }
  }

  getConfig() {
    return {
      tokens: this.state,
      defaultTokens: this.stateDefaultValues,
    };
  }
}

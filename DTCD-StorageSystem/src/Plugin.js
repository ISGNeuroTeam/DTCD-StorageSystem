import { SystemPlugin, LogSystemAdapter } from './../../DTCD-SDK/index';
import { initializeVuexModule } from './utils/initializeVuexModule';
import pluginMeta from './Plugin.Meta';

const vuexModuleName = 'UserDataStorage';

const throwError = (message) => {
  throw new Error(message);
};

/**
 * StorageSystem core plugin.
 * @extends SystemPlugin
 */
export class Plugin extends SystemPlugin {

  static getRegistrationMeta () {
    return pluginMeta;
  }

  constructor (guid) {
    super();

    const VueJS = this.getDependence('Vue');
    const Vuex = this.getDependence('Vuex');

    this.logSystem = new LogSystemAdapter(guid, pluginMeta.name);

    const vue = VueJS.default;
    vue.use(Vuex);

    this._store = new Vuex.Store({
      state: {},
      getters: {},
      mutations: {},
      actions: {},
      modules: { ...initializeVuexModule(vuexModuleName, vue) },
    });

    this._dispatch = this._store.dispatch;
    this._sessionStorage = this._store.state[vuexModuleName];
  }

  _checkRecordKey (key) {
    if (typeof key !== 'string') {
      throwError('Record key must be a string');
    } else if (key === '' || key.startsWith(' ')) {
      throwError('Record key cannot be empty or start with a space');
    }
  }

  _isKeyExistInStorage (key) {
    return key in this._sessionStorage;
  }

  _createRecord (createType, { key, value }) {
    this._checkRecordKey(key);

    if (createType === 'add') {
      if (this._isKeyExistInStorage(key)) {
        throwError(`Record with key "${key}" already exists`);
      }
    }

    if (typeof value === 'function') {
      throwError('Record value cannot be a function');
    }

    this._dispatch(`${vuexModuleName}/addRecord`, { key, value });
  }

  /**
   * Create a new record in storage.
   * @method
   * @param {string} key Record key name.
   * @param {*} value Record stored value.
   */
  addRecord (key, value) {
    this._createRecord('add', { key, value });
    this.logSystem.log(`Added record with key "${key}"`);
  }

  /**
   * Replace record value by key or create a new record to storage.
   * @method
   * @param {string} key Record key name.
   * @param {*} value Record stored value.
   */
  putRecord (key, value) {
    this._createRecord('put', { key, value });
    this.logSystem.log(`Putted record with key "${key}"`);
  }

  /**
   * Check for a record in the storage.
   * @method
   * @param {string} key Record key name.
   * @returns {boolean} Returns true if record exists in storage.
   */
  hasRecord (key) {
    return this._isKeyExistInStorage(key);
  }

  /**
   * Get record value from storage by key.
   * @method
   * @param {string} key Record key name.
   * @returns {*} Storage record value.
   */
  getRecord (key) {
    return this._store.getters['UserDataStorage/getRecord'](key);
  }

  /**
   * Delete record from storage by key.
   * @method
   * @param {string} key Record key name.
   * @returns {string} Operation result.
   */
  removeRecord (key) {
    this._dispatch(`${vuexModuleName}/removeRecord`, key);
    this.logSystem.log(`Record with key "${key}" has been removed`);
    return 'success';
  }

  /**
   * Removing all records from storage.
   * @method
   * @returns {string} Operation result.
   */
  clearStorage () {
    this._dispatch(`${vuexModuleName}/clear`);
    this.logSystem.log('Storage has been cleared');
    return 'success';
  }

}

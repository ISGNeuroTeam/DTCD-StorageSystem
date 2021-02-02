import { SystemPlugin, EventSystemAdapter, LogSystemAdapter } from './../../../DTCD-SDK/index'
import { TYPE_SESSION, TYPE_PERSIST } from './utils/storageTypes';
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
    this.guid = guid;
    const VueJS = this.getDependence("Vue")
    const Vuex = this.getDependence("Vuex")

    this.eventSystem = new EventSystemAdapter();
    this.logSystem = new LogSystemAdapter(guid, vuexModuleName)
    this.validStorageTypes = [TYPE_SESSION, TYPE_PERSIST];

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

  _checkStorageType (type) {
    if (typeof type !== 'string') {
      throwError('Invalid storage type');
    } else if (!this.validStorageTypes.includes(type)) {
      throwError('Storage type must be "session" or "persist"');
    }
  }

  _checkRecordKey (key) {
    if (typeof key !== 'string') {
      throwError('Record key must be a string');
    } else if (key === '' || key.startsWith(' ')) {
      throwError('Record key cannot be empty or start with a space');
    }
  }

  _isKeyExistInStorage (key, storage) {
    this._checkStorageType(storage);
    this._checkRecordKey(key);
    return storage === TYPE_PERSIST ? false : key in this._sessionStorage;
  }

  _createRecord (createType, { key, value, storage }) {
    this._checkStorageType(storage);
    this._checkRecordKey(key);

    if (createType === 'add') {
      if (this._isKeyExistInStorage(key, storage)) {
        throwError(`Record with key "${key}" already exists`);
      }
    }

    if (typeof value === 'function') {
      throwError('Record value cannot be a function');
    }

    if (storage === TYPE_PERSIST) {
      return console.warn('Будет добавлено в IndexedDB');
    }

    this._dispatch(`${vuexModuleName}/addRecord`, { key, value });
  }

  /**
   * Create a new record in storage.
   * @method
   * @param {string} key Record key name.
   * @param {*} value Record stored value.
   * @param {string} storage Storage type.
   */
  addRecord (key, value, storage = TYPE_SESSION) {
    this.logSystem.log(`Add record ${key}`)
    this._createRecord('add', { key, value, storage });
  }

  /**
   * Replace record value by key or create a new record to storage.
   * @method
   * @param {string} key Record key name.
   * @param {*} value Record stored value.
   * @param {string} storage Storage type.
   */
  putRecord (key, value, storage = TYPE_SESSION) {
    this._createRecord('put', { key, value, storage });
  }

  /**
   * Check for a record in the storage.
   * @method
   * @param {string} key Record key name.
   * @param {string} storage Storage type.
   * @returns {boolean} Returns true if record exists in storage.
   */
  hasRecord (key, storage = TYPE_SESSION) {
    return this._isKeyExistInStorage(key, storage);
  }

  /**
   * Get record value from storage by key.
   * @method
   * @param {string} key Record key name.
   * @param {string} storage Storage type.
   * @returns {*} Storage record value.
   */
  getRecord (key, storage = TYPE_SESSION) {
    this._checkStorageType(storage);

    if (storage === TYPE_PERSIST) {
      console.warn(`Запись с ключом "${key}" из IndexedDB`);
      return 'record';
    }

    return this._store.getters['UserDataStorage/getRecord'](key);
  }

  /**
   * Delete record from storage by key.
   * @method
   * @param {string} key Record key name.
   * @param {string} storage Storage type.
   */
  removeRecord (key, storage = TYPE_SESSION) {
    this._checkStorageType(storage);

    if (storage === TYPE_PERSIST) {
      console.warn('Будет удалено из IndexedDB');
      return 'success';
    }

    this._dispatch(`${vuexModuleName}/removeRecord`, key);
    return 'success';
  }

  /**
   * Clear the specified storage type.
   * @method
   * @param {string} storage Storage type.
   */
  clearStorage (storage = TYPE_SESSION) {
    this._checkStorageType(storage);

    if (storage === TYPE_PERSIST) {
      console.warn('Будет очищено хранилище IndexedDB');
      return 'success';
    }

    this._dispatch(`${vuexModuleName}/clear`);
    return 'success';
  }

}

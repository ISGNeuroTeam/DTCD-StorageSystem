import BrowserModuleScope from './BrowserModuleScope';

/**
 * StorageSystem browser module class.
 * @class
 */
export default class BrowserModule {

  /**
   * IndexedDB database name.
   * @property @private
   */
  #dbName = 'StorageSystem-BrowserModule';

  /**
   * Module scope list.
   * @property @private
   */
  #scopes = [
    { id: 'user', name: 'USER_SCOPE' },
    { id: 'dash', name: 'DASH_SCOPE' },
    { id: 'system', name: 'SYSTEM_SCOPE' },
  ];

  /**
   * Private instance of the LogSystemAdapter class.
   * @property @private
   */
  #logSystem;

  /**
   * Initialize BrowserModule instance.
   * @constructor
   * @param {Object} logSystem LogSystemAdapter from StorageSystem instance.
   */
  constructor(logSystem) {
    this.#logSystem = logSystem;

    const dbOpenRequest = indexedDB.open(this.#dbName, 1);
    dbOpenRequest.onerror = e => this.#onerror(e);
    dbOpenRequest.onsuccess = e => this.#onsuccess(e);
    dbOpenRequest.onupgradeneeded = e => this.#onupgradeneeded(e);

    this.#logSystem.info(`BrowserModule: initialization complete`);
    this.#logSystem.debug(`BrowserModule: initialization complete`);
  }

  /**
   * IDBOpenDBRequest onerror handler.
   * @method @private
   * @param {Error} error IndexedDB error.
   */
  #onerror(error) {
    this.#logSystem.info(`BrowserModule: IndexedDB error occurred`);
    this.#logSystem.debug(`BrowserModule: IndexedDB error - ${error.message}`);
    throw error;
  }

  /**
   * IDBOpenDBRequest onsuccess handler.
   * @method @private
   * @param {Event} event IndexedDB event.
   */
  #onsuccess(event) {
    const db = event.target.result;
    this.#scopes.forEach(({ id, name }) => {
      Object.defineProperty(this, id, {
        writable: false,
        enumerable: true,
        configurable: false,
        value: new BrowserModuleScope(db, name, this.#logSystem),
      });
    });
    this.#logSystem.info(`BrowserModule: IndexedDB opened successfully`);
    this.#logSystem.debug(`BrowserModule: IndexedDB opened successfully`);
  }

  /**
   * IDBOpenDBRequest onupgradeneeded handler.
   * @method @private
   * @param {Event} event IndexedDB event.
   */
  #onupgradeneeded(event) {
    const db = event.target.result;
    this.#scopes.forEach(({ name }) => {
      if (!db.objectStoreNames.contains(name)) {
        db.createObjectStore(name);
      }
    });
    this.#logSystem.info(`BrowserModule: IndexedDB upgraded successfully`);
    this.#logSystem.debug(`BrowserModule: IndexedDB upgraded successfully`);
  }

}

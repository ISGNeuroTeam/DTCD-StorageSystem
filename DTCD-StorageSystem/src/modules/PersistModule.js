import { BaseModule } from './_BaseModule';
import { RecordDuplicateError } from '@/utils/errors/recordErrors';

/**
 * Storage system session module class.
 * @class @extends BaseModule
 */
export class PersistModule extends BaseModule {

  #dbName = 'StorageSystem_PersistModule';
  #storeName = 'records';
  #storage;
  #logSystem;
  #db;
  #dbOpenRequest;

  constructor(storage, logSystem) {
    super();
    this.#storage = storage;
    this.#logSystem = logSystem;
    this.#dbOpenRequest = indexedDB.open(this.#dbName, 1);
    this.#dbOpenRequest.onerror = e => this.#onerror(e);
    this.#dbOpenRequest.onsuccess = e => this.#onsuccess(e);
    this.#dbOpenRequest.onupgradeneeded = e => this.#onupgradeneeded(e);
    this.#logSystem.debug(`${this.#storage} --> new PersistModule()`);
    this.#logSystem.info(`${this.#storage} PersistModule: initialization complete`);
  }

  #onerror(error) {
    throw error;
  }

  #onsuccess(event) {
    this.#db = event.target.result;
  }

  #onupgradeneeded(event) {
    const { result: db } = event.target;
    if (!db.objectStoreNames.contains(this.#storeName)) {
      db.createObjectStore(this.#storeName);
    }
  }

  #createTransaction(isReadWrite = false) {
    const type = isReadWrite ? 'readwrite' : 'readonly';
    return this.#db.transaction(this.#storeName, type)
  }

  #getStoreFromTransaction(transaction) {
    return transaction.objectStore(this.#storeName);
  }

  async #setRecord(key, value, checkUnique = false) {
    try {
      const addedKey = BaseModule.checkRecordKey(key);
      const addedValue = BaseModule.checkRecordValue(value);

      if (checkUnique && await this.hasRecord(addedKey)) {
        throw new RecordDuplicateError(addedKey);
      }

      const transaction = this.#createTransaction(true);
      const store = this.#getStoreFromTransaction(transaction);
      store.put(addedValue, addedKey);
      this.#logSystem.debug(`${this.#storage} PersistModule state: SET "${addedKey}" => ${addedValue}`);

      return addedKey;
    } catch (err) {
      throw err;
    }
  }

  async addRecord(key, value) {
    const settedKey = await this.#setRecord(key, value, true);
    this.#logSystem.info(`${this.#storage} PersistModule: added "${settedKey}" record`);
    return this;
  }

  async putRecord(key, value) {
    const settedKey = await this.#setRecord(key, value);
    this.#logSystem.info(`${this.#storage} PersistModule: putted "${settedKey}" record`);
    return this;
  }

  getRecord(key) {
    this.#logSystem.debug(`${this.#storage} PersistModule state --> get(${key})`);
    return new Promise((resolve, reject) => {
      const transaction = this.#createTransaction();
      const store = this.#getStoreFromTransaction(transaction);
      const request = store.get(key);
      request.onerror = err => reject(err);
      request.onsuccess = event => resolve(event.target.result);
    });
  }

  async hasRecord(key) {
    this.#logSystem.debug(`${this.#storage} PersistModule state --> has(${key})`);
    const records = await this.recordList;
    return records.includes(key);
  }

  async removeRecord(key) {
    this.#logSystem.debug(`${this.#storage} PersistModule state --> delete(${key})`);

    const isExist = await this.hasRecord(key);

    if (!isExist) {
      return Promise.resolve(false);
    }

    return new Promise((resolve, reject) => {
      const transaction = this.#createTransaction(true);
      const store = this.#getStoreFromTransaction(transaction);
      const request = store.delete(key);
      request.onerror = err => reject(err);
      request.onsuccess = event => resolve(true);
    });
  }

  async clearModule() {
    this.#logSystem.debug(`${this.#storage} PersistModule state --> clear()`);
    const countBeforeClear = await this.recordCount;
    return new Promise((resolve, reject) => {
      const transaction = this.#createTransaction(true);
      const store = this.#getStoreFromTransaction(transaction);
      const request = store.clear();
      request.onerror = err => reject(err);
      request.onsuccess = event => resolve(countBeforeClear);
    });
  }

  get recordCount() {
    return new Promise((resolve, reject) => {
      const transaction = this.#createTransaction();
      const store = this.#getStoreFromTransaction(transaction);
      const request = store.count();
      request.onerror = err => reject(err);
      request.onsuccess = event => resolve(event.target.result);
    });
  }

  get recordList() {
    return new Promise((resolve, reject) => {
      const transaction = this.#createTransaction();
      const store = this.#getStoreFromTransaction(transaction);
      const request = store.getAllKeys();
      request.onerror = err => reject(err);
      request.onsuccess = event => resolve(event.target.result);
    });
  }

}

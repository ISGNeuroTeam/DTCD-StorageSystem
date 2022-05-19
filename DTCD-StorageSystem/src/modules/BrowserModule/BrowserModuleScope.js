import { BaseModule } from './../_BaseModule';
import { RecordDuplicateError } from '@/utils/errors/recordErrors';

export default class BrowserModuleScope extends BaseModule {

  #db;
  #store;
  #logSystem;

  constructor(db, store, logSystem) {
    super();
    this.#db = db;
    this.#store = store;
    this.#logSystem = logSystem;
  }

  async addRecord(key, value) {
    const settedKey = await this.#setRecord(key, value, true);
    this.#logSystem.info(`BrowserModule[${this.#store}]: added "${settedKey}" record`);
    this.#logSystem.debug(`BrowserModule[${this.#store}] --> addRecord(${key}, ${value})`);
    return this;
  }

  async putRecord(key, value) {
    const settedKey = await this.#setRecord(key, value);
    this.#logSystem.info(`BrowserModule[${this.#store}]: putted "${settedKey}" record`);
    this.#logSystem.debug(`BrowserModule[${this.#store}] --> putRecord(${key}, ${value})`);
    return this;
  }

  getRecord(key) {
    this.#logSystem.debug(`BrowserModule[${this.#store}] --> getRecord(${key})`);
    return new Promise((resolve, reject) => {
      const store = this.#createTransactionStore();
      const request = store.get(key);
      request.onerror = err => reject(err);
      request.onsuccess = event => resolve(event.target.result);
    });
  }

  async hasRecord(key) {
    this.#logSystem.debug(`BrowserModule[${this.#store}] --> hasRecord(${key})`);
    const records = await this.recordList;
    return records.includes(key);
  }

  async removeRecord(key) {
    const isExist = await this.hasRecord(key);

    if (!isExist) return Promise.resolve(false);

    this.#logSystem.info(`BrowserModule[${this.#store}]: removed "${key}" record`);
    this.#logSystem.debug(`BrowserModule[${this.#store}] --> removeRecord(${key})`);

    return new Promise((resolve, reject) => {
      const store = this.#createTransactionStore(true);
      const request = store.delete(key);
      request.onerror = err => reject(err);
      request.onsuccess = event => resolve(true);
    });
  }

  async clearModule() {
    const countBeforeClear = await this.recordCount;

    this.#logSystem.info(`BrowserModule[${this.#store}]: scope cleared, ${countBeforeClear} records removed`);
    this.#logSystem.debug(`BrowserModule[${this.#store}] --> clearModule(), ${countBeforeClear} records`);

    return new Promise((resolve, reject) => {
      const store = this.#createTransactionStore(true);
      const request = store.clear();
      request.onerror = err => reject(err);
      request.onsuccess = event => resolve(countBeforeClear);
    });
  }

  get recordCount() {
    return new Promise((resolve, reject) => {
      const store = this.#createTransactionStore();
      const request = store.count();
      request.onerror = err => reject(err);
      request.onsuccess = event => resolve(event.target.result);
    });
  }

  get recordList() {
    return new Promise((resolve, reject) => {
      const store = this.#createTransactionStore();
      const request = store.getAllKeys();
      request.onerror = err => reject(err);
      request.onsuccess = event => resolve(event.target.result);
    });
  }

  #createTransactionStore(isReadWrite = false) {
    const type = isReadWrite ? 'readwrite' : 'readonly';
    const transaction = this.#db.transaction(this.#store, type);
    this.#logSystem.debug(`BrowserModule[${this.#store}] --> ${type} transaction created`);
    return transaction.objectStore(this.#store);
  }

  async #setRecord(key, value, checkUnique = false) {
    try {
      const addedKey = BaseModule.checkRecordKey(key);
      const addedValue = BaseModule.checkRecordValue(value);

      if (checkUnique && await this.hasRecord(addedKey)) {
        throw new RecordDuplicateError(addedKey);
      }

      const store = this.#createTransactionStore(true);
      store.put(addedValue, addedKey);

      return addedKey;
    } catch (error) {
      console.log(`BrowserModule[${this.#store}] --> record putting error: ${error.message}`);
      this.#logSystem.debug(`BrowserModule[${this.#store}] --> record putting error: ${error.message}`);
      throw error;
    }
  }

}

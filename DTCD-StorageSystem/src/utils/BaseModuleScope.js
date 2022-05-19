import { checkKey, checkValue } from '@/utils/recordChecks';
import { AbstractClassInstanceError, MethodImplementError } from '@/utils/errors/abstractClassErrors';

/**
 * Storage system base module scope class.
 * @class @abstract
 */
export default class BaseModuleScope {

  /**
   * Initialize BaseModuleScope instance.
   * @constructor
   */
  constructor () {
    if (this.constructor === BaseModuleScope) {
      throw new AbstractClassInstanceError(this.constructor.name);
    }
  }

  /**
   * Checking the record key for compliance with the rules.
   * @method @static @public
   * @param {string} key Checks record key name.
   * @returns {string} Trimmed record key.
   */
  static checkRecordKey (key) {
    return checkKey(key);
  }

  /**
   * Checking the record value for compliance with the rules.
   * @method @static @public
   * @param {*} value Checks record value.
   * @returns {*} Record value.
   */
  static checkRecordValue (value) {
    return checkValue(value);
  }

  /**
   * Abstract method that must be implemented.
   * @method @abstract
   */
  addRecord () {
    throw new MethodImplementError('addRecord', this.constructor.name);
  }

  /**
   * Abstract method that must be implemented.
   * @method @abstract
   */
  putRecord () {
    throw new MethodImplementError('putRecord', this.constructor.name);
  }

  /**
   * Abstract method that must be implemented.
   * @method @abstract
   */
  getRecord () {
    throw new MethodImplementError('getRecord', this.constructor.name);
  }

  /**
   * Abstract method that must be implemented.
   * @method @abstract
   */
  hasRecord () {
    throw new MethodImplementError('hasRecord', this.constructor.name);
  }

  /**
   * Abstract method that must be implemented.
   * @method @abstract
   */
  removeRecord () {
    throw new MethodImplementError('removeRecord', this.constructor.name);
  }

  /**
   * Abstract method that must be implemented.
   * @method @abstract
   */
  clearModule () {
    throw new MethodImplementError('clearModule', this.constructor.name);
  }

}

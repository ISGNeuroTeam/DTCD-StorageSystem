import { BaseAdapter } from './BaseAdapter';

/**
 * StorageSystem adapter class.
 * @class @extends BaseAdapter
 */
export class StorageSystemAdapter extends BaseAdapter {

  /**
   * Initialize StorageSystemAdapter instance.
   * @constructor
   */
  constructor () {
    super();
    this.instance = this.getSystem('StorageSystem');
  }

  /**
   * Session module.
   * @property @public
   * @returns {SessionModule} SessionModule instance.
   */
  get session () {
    return this.instance.session;
  }

}

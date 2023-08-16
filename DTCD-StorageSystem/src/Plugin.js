import {
  SystemPlugin,
  LogSystemAdapter,
  EventSystemAdapter,
} from 'SDK';
;
import SessionModule from './modules/SessionModule/SessionModule';
import BrowserModule from './modules/BrowserModule/BrowserModule';

import pluginMeta from './Plugin.Meta';

/**
 * StorageSystem core plugin class.
 * @class @extends SystemPlugin
 */
export class StorageSystem extends SystemPlugin {
  /**
   * Private instance of the SessionModule class.
   * @property @private
   */
  #sessionModule;

  /**
   * Private instance of the BrowserModule class.
   * @property @private
   */
  #browserModule;

  /**
   * Private instance of the LogSystemAdapter class.
   * @property @private
   */
  #logSystem;

  /**
   * Private instance of the EventSystemAdapter class.
   * @property @private
   */
  #eventSystem;

  /**
   * Initialize StorageSystem instance.
   * @constructor
   * @param {string} guid System instance GUID.
   */
  constructor(guid) {
    super();

    const systemName = `StorageSystem[${guid}]`;
    this.#logSystem = new LogSystemAdapter('0.5.0', guid, pluginMeta.name);
    this.#logSystem.debug(`Start of ${systemName} creation`);

    this.#eventSystem = new EventSystemAdapter('0.6.0', guid);

    this.#sessionModule = new SessionModule(systemName, this.#logSystem, this.#eventSystem);
    this.#browserModule = new BrowserModule(this.#logSystem);

    this.#logSystem.debug(`End of ${systemName} creation`);
    this.#logSystem.info(`${systemName} initialization complete`);
  }

  /**
   * Session module.
   * @property @public
   * @returns {SessionModule} SessionModule instance.
   */
  get session() {
    return this.#sessionModule;
  }

  /**
   * Token module.
   * @property @public
   * @deprecated Use `StorageSystem.session.tokenStorage`.
   * @returns {TokenModule} TokenModule instance.
   */
  get tokenStorage() {
    return this.session.tokenStorage;
  }

  /**
   * Browser module.
   * @property @public
   * @returns {BrowserModule} BrowserModule instance.
   */
  get browser() {
    return this.#browserModule;
  }

  setPluginConfig(config = {}) {
    const {
      tokens,
      defaultTokens,
    } = config;

    if (tokens) {
      for (const [key, value] of tokens) {
        this.session.tokenStorage.addRecord(key, value);
      }
    }
    if (defaultTokens) {
      for (const [key, value] of defaultTokens) {
        this.session.tokenStorage.setDefaultRecord(key, value);
      }
    }
  }

  getPluginConfig() {
    const tokens = this.session.tokenStorage.state;
    const defaultTokens = this.session.tokenStorage.stateDefaultValues;

    return {
      tokens,
      defaultTokens,
    };
  }

  /**
   * Returns plugin metadata object.
   * @method @static
   * @returns {object} Plugin metadata object.
   */
  static getRegistrationMeta() {
    return pluginMeta;
  }
}

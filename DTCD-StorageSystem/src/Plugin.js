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
   * Name of StorageSystem instance.
   * @property @private
   */
  #systemName;

  /**
   * Initialize StorageSystem instance.
   * @constructor
   * @param {string} guid System instance GUID.
   */
  constructor(guid) {
    super();

    this.#systemName = `StorageSystem[${guid}]`;
    this.#logSystem = new LogSystemAdapter('0.5.0', guid, pluginMeta.name);
    this.#logSystem.debug(`Start of ${this.#systemName} creation`);

    this.#eventSystem = new EventSystemAdapter('0.6.0', guid);

    this.#sessionModule = new SessionModule(this.#systemName, this.#logSystem, this.#eventSystem);
    this.#browserModule = new BrowserModule(this.#logSystem);

    this.#logSystem.debug(`End of ${this.#systemName} creation`);
    this.#logSystem.info(`${this.#systemName} initialization complete`);
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

  resetSystem() {
    this.session.tokenStorage.clearModule();
    this.#logSystem.info(`${this.#systemName} reseting is completed.`);
  }

  /**
   * Setting plugin data and configuration.
   * @param {Object} config Object with plugin data and configuration.
   * @param {Object} config.tokenModuleConfig Object with data for token module.
   */
  setPluginConfig(config = {}) {
    const {
      tokenModuleConfig,
    } = config;

    if (tokenModuleConfig) this.session.tokenStorage.setConfig(tokenModuleConfig);
  }

  /**
   * Getting plugin data and configuration.
   * @returns {Object} Object with plugin data.
   */
  getPluginConfig() {
    const tokenModuleConfig = this.session.tokenStorage.getConfig();

    return {
      tokenModuleConfig,
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

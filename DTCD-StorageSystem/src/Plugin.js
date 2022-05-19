import { SystemPlugin, LogSystemAdapter, EventSystemAdapter } from 'SDK';
import { SessionModule } from './modules/SessionModule';
import { TokenModule } from './modules/TokenModule';
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
   * Private instance of the TokenModule class.
   * @property @private
   */
  #tokenModule;

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

    this.#eventSystem = new EventSystemAdapter('0.4.0', guid);

    this.#sessionModule = new SessionModule(systemName, this.#logSystem);
    this.#tokenModule = new TokenModule(systemName, this.#logSystem, this.#eventSystem);
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
   * @returns {TokenModule} TokenModule instance.
   */
  get tokenStorage() {
    return this.#tokenModule;
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
    const { tokens } = config;
    for (const [key, value] of tokens) {
      if (!this.tokenStorage.hasRecord(key)) this.tokenStorage.addRecord(key, value);
    }
  }

  getPluginConfig() {
    const tokens = this.tokenStorage.state;
    return { tokens };
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

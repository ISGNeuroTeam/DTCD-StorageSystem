import { SystemPlugin, LogSystemAdapter } from 'SDK';
import { SessionModule } from './modules/SessionModule';
import { TokenModule } from './modules/TokenModule';
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
   * Private instance of the LogSystemAdapter class.
   * @property @private
   */
  #logSystem;

  /**
   * Initialize StorageSystem instance.
   * @constructor
   * @param {string} guid System instance GUID.
   */
  constructor (guid) {
    super();

    const systemName = `StorageSystem[${guid}]`;
    this.#logSystem = new LogSystemAdapter(guid, pluginMeta.name);
    this.#logSystem.debug(`Start of ${systemName} creation`);

    this.#sessionModule = new SessionModule(systemName, this.#logSystem);
    this.#tokenModule = new TokenModule(systemName, this.#logSystem);

    this.#logSystem.debug(`End of ${systemName} creation`)
    this.#logSystem.info(`${systemName} initialization complete`);
  }

  /**
   * Session module.
   * @property @public
   * @returns {SessionModule} SessionModule instance.
   */
  get session () {
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
   * Returns plugin metadata object.
   * @method @static
   * @returns {object} Plugin metadata object.
   */
  static getRegistrationMeta () {
    return pluginMeta;
  }

}

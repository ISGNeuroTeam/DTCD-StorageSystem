import SessionModuleScope from './SessionModuleScope';
import TokenModule from './TokenModule';

export default class SessionModule extends SessionModuleScope {

  /**
   * Private instance of the TokenModule class.
   * @property @private
   */
  #tokenModule;

  #scopes = ['user', 'dash', 'system'];

  constructor(systemName, logSystem, eventSystem) {
    super(systemName, logSystem);

    this.#scopes.forEach(scope => {
      Object.defineProperty(this, scope, {
        writable: false,
        enumerable: true,
        configurable: false,
        value: new SessionModuleScope(systemName, logSystem),
      });
    });

    this.#tokenModule = new TokenModule(systemName, logSystem, eventSystem);
  }

  /**
   * Token module.
   * @property @public
   * @returns {TokenModule} TokenModule instance.
   */
  get tokenStorage() {
    return this.#tokenModule;
  }
}

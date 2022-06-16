import SessionModuleScope from './SessionModuleScope';

export default class SessionModule extends SessionModuleScope {

  #scopes = ['user', 'dash', 'system'];

  constructor(systemName, logSystem) {
    super(systemName, logSystem);
    this.#scopes.forEach(scope => {
      Object.defineProperty(this, scope, {
        writable: false,
        enumerable: true,
        configurable: false,
        value: new SessionModuleScope(systemName, logSystem),
      });
    });
  }

}

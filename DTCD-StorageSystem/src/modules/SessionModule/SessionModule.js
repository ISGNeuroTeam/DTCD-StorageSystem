import SessionModuleScope from './SessionModuleScope';

export default class SessionModule extends SessionModuleScope {

  #names = ['user', 'dash', 'system'];
  #scopes = [];

  constructor(systemName, logSystem) {
    super(systemName, logSystem);
    this.#names.forEach(name => {
      const scope = new SessionModuleScope(systemName, logSystem);
      this.#scopes.push({scope, name})
      Object.defineProperty(this, name, {
        writable: false,
        enumerable: true,
        configurable: false,
        value: scope,
      });
    });
  }

  get scopes () {
    return this.#names;
  }

  get name() {
    return 'session';
  }
}

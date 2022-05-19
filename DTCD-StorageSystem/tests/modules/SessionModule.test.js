import { StorageSystem } from '@/Plugin';
import { initApp } from 'utils/initApp';
import BaseModuleScope from '@/utils/BaseModuleScope';

import { methodTestList } from './methods/_list';
import { propertyTestList } from './properties/_list';

initApp();

describe('Check the session module of the StorageSystem instance:', () => {

  const sessionModule = new StorageSystem('guid1').session;

  test('SessionModule exists', () => {
    expect(sessionModule).toBeDefined();
  });

  test('SessionModule extends BaseModuleScope class', () => {
    expect(sessionModule).toBeInstanceOf(BaseModuleScope);
  });

  describe('Check SessionModule scopes', () => {
    for (const scopeName of Object.keys(sessionModule)) {
      describe(`Check ${scopeName} scope:`, () => {
        const scope = sessionModule[scopeName];

        test('Scope extends BaseModuleScope class', () => {
          expect(scope).toBeInstanceOf(BaseModuleScope);
        });

        describe('Check public methods:', () => {
          methodTestList.forEach(test => test(scope));
        });

        describe(`Check public properties of ${scope} scope:`, () => {
          propertyTestList.forEach(test => test(scope));
        });
      });
    }
  });

});

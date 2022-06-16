import { StorageSystem } from '@/Plugin';
import { initApp } from 'utils/initApp';
import BaseModuleScope from '@/utils/BaseModuleScope';

import { methodTestList } from './methods/_list';
import { propertyTestList } from './properties/_list';

initApp();

describe('Check the browser module of the StorageSystem instance:', () => {

  const browserModule = new StorageSystem('guid1').browser;

  test('BrowserModule exists', () => {
    expect(browserModule).toBeDefined();
  });

  // TODO: async test for BrowserModule
  // describe('Check BrowserModule scopes', () => {
  //   for (const scopeName of Object.keys(browserModule)) {
  //     console.log(scopeName + 'scope');
  //     const scope = browserModule[scopeName];

  //     test('Scope extends BaseModuleScope class', () => {
  //       expect(scope).toBeInstanceOf(BaseModuleScope);
  //     });
  //   }
  // });

});

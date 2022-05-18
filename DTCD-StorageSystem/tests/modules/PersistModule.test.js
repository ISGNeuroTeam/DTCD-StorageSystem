import { StorageSystem } from '@/Plugin';
import { BaseModule } from '@/modules/_BaseModule';
import { initApp } from 'utils/initApp';

import { methodTestList } from './methods/_list';
import { propertyTestList } from './properties/_list';

initApp();

describe('Check the persist module of the StorageSystem instance:', () => {

  const persistModule = new StorageSystem('guid1').persist;

  test('PersistModule exists', () => {
    expect(persistModule).toBeDefined();
  });

  test('PersistModule extends BaseModule class', () => {
    expect(persistModule).toBeInstanceOf(BaseModule);
  });

  describe('Check public methods:', () => {
    // TODO: make test for async methods (returns Promise)
    // methodTestList.forEach(test => test(persistModule));
  });

  describe('Check public properties:', () => {
    // TODO: make test for async props (returns Promise)
    // propertyTestList.forEach(test => test(persistModule));
  });

});

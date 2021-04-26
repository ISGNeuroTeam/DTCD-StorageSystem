import { StorageSystem } from '@/Plugin';
import { BaseModule } from '@/modules/_BaseModule';
import { initApp } from 'utils/initApp';

import { methodTestList } from './methods/_list';
import { propertyTestList } from './properties/_list';

initApp();

describe('Check the session module of the StorageSystem instance:', () => {

  const sessionModule = new StorageSystem('guid1').session;

  test('SessionModule exists', () => {
    expect(sessionModule).toBeDefined();
  });

  test('SessionModule extends BaseModule class', () => {
    expect(sessionModule).toBeInstanceOf(BaseModule);
  });

  describe('Check public methods:', () => {
    methodTestList.forEach(test => test(sessionModule));
  });

  describe('Check public properties:', () => {
    propertyTestList.forEach(test => test(sessionModule));
  });

});

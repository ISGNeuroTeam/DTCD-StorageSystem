import { StorageSystem } from '@/Plugin';
import { SystemPlugin } from 'SDK';
import { initApp } from 'utils/initApp';

initApp();

test('StorageSystem extends SystemPlugin class', () => {
  const storage = new StorageSystem('guid1');
  expect(storage).toBeInstanceOf(SystemPlugin);
});

describe('Check StorageSystem static method getRegistrationMeta():', () => {

  const pluginMeta = StorageSystem.getRegistrationMeta();

  test('Method exists', () => {
    expect(StorageSystem.getRegistrationMeta).toBeDefined();
    expect(typeof StorageSystem.getRegistrationMeta).toEqual('function');
  });

  test('Method returns a non-empty object', () => {
    expect(pluginMeta).toBeDefined();
    expect(pluginMeta).not.toBeNull();
    expect(typeof pluginMeta).toEqual('object');
    expect(Object.keys(pluginMeta).length).toBeGreaterThan(0);
  });

  describe('Check returned meta object:', () => {

    const { type, name, title, version, priority } = pluginMeta;

    test('Property "type" is exists and is equal to "core" string', () => {
      expect(type).toBeDefined();
      expect(type).toEqual('core');
    });

    test('Property "name" is exists and is a string', () => {
      expect(name).toBeDefined();
      expect(typeof name).toEqual('string');
    });

    test('Property "title" is exists and is a string', () => {
      expect(title).toBeDefined();
      expect(typeof title).toEqual('string');
    });

    test('Property "version" is exists and is a string ', () => {
      expect(version).toBeDefined();
      expect(typeof version).toEqual('string');
    });

    test('Property "priority" is exists and is a number', () => {
      expect(priority).toBeDefined();
      expect(typeof priority).toEqual('number');
    });

  })

});

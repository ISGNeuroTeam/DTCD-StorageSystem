import { Plugin } from './../src/Plugin';

const pluginMeta = Plugin.getRegistrationMeta();

describe('Check static method Plugin.getRegistrationMeta()', () => {

  test('Method exists', () => {
    expect(Plugin.getRegistrationMeta).toBeDefined();
    expect(typeof Plugin.getRegistrationMeta).toEqual('function');
  });

  test('Method returns a non-empty object ', () => {
    expect(pluginMeta !== null).toEqual(true);
    expect(typeof pluginMeta).toEqual('object');
    expect(Object.keys(pluginMeta).length).toBeGreaterThan(0);
  });

  const { type, name, title } = pluginMeta;

  describe('Check returned meta object', () => {

    test('Property "type" is exists and is equal to "core" string', () => {
      expect(type).toBeDefined();
      expect(typeof type).toEqual('string');
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

  })

});

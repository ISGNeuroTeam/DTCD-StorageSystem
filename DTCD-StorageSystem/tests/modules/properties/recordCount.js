import { isPropInModule } from 'utils/isPropInModule';

export default (module) => {

  beforeEach(() => module.clearModule());

  describe('Check recordCount property:', () => {

    test('Property exists', () => {
      expect(isPropInModule(module, 'recordCount')).toBeTruthy();
    });

    test('Property returns a number value', () => {
      expect(typeof module.recordCount).toEqual('number');
    });

    test('Get the number of module records', () => {
      expect(module.recordCount).toEqual(0);

      ['key1', 'key2', 'key3'].forEach((key, i) => {
        module.addRecord(key, i);
        expect(module.recordCount).toEqual(i + 1);
      });

      const count = module.recordCount;

      module.removeRecord('key1');
      expect(module.recordCount).toEqual(count - 1);

      module.clearModule();
      expect(module.recordCount).toEqual(0);
    });

  });

};

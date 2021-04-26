import { isPropInModule } from 'utils/isPropInModule';

export default (module) => {

  beforeEach(() => module.clearModule());

  describe('Check recordList property:', () => {

    test('Property exists', () => {
      expect(isPropInModule(module, 'recordList')).toBeTruthy();
    });

    test('Property returns an array of strings', () => {
      expect(Array.isArray(module.recordList)).toBeTruthy();
      [1, 2, 3].forEach(item => module.addRecord(`key${item}`, item));
      const isAllStrings = module.recordList.every(key => typeof key === 'string');
      expect(isAllStrings).toBeTruthy();
    });

    test('Get a list of module records keys', () => {
      expect(module.recordList.length).toEqual(0);

      ['key1', 'key2', 'key3'].forEach((key, i) => {
        module.addRecord(key, i);
        expect(module.recordList).toContain(key);
        expect(module.recordList.length).toEqual(i + 1);
      });

      const keyCount = module.recordList.length;
      const deletedKey = 'key1';

      module.removeRecord(deletedKey);
      expect(module.recordList.length).toEqual(keyCount - 1);
      expect(module.recordList).not.toContain(deletedKey);

      module.clearModule();
      expect(module.recordList.length).toEqual(0);
    });

  });

};

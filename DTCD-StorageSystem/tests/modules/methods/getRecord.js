import { isPropInModule } from 'utils/isPropInModule';

export default (module) => {

  beforeEach(() => module.clearModule());

  describe('Check getRecord() method:', () => {

    test('Method exists', () => {
      expect(module.getRecord).toBeDefined();
      expect(typeof module.getRecord).toEqual('function');
      expect(isPropInModule(module, 'getRecord')).toBeTruthy();
    });

    test('Trying to get the value of an existing record', () => {
      [true, false, 1, 'value', [1, 2], { a: 1, b: 2 }].forEach((val, i) => {
        const key = `key${i}`;
        module.addRecord(key, val);
        const record = module.getRecord(key);
        expect(record).toEqual(val);
      });
    });

    test('Trying to get the value of a non-existent record', () => {
      for (let i = 0; i < 10; i++) {
        const record = module.getRecord(`key${i}`);
        expect(record).toBeUndefined();
      }
    });

  });

};

import { isPropInModule } from 'utils/isPropInModule';

export default (module) => {

  beforeEach(() => module.clearModule());

  describe('Check addRecord() method:', () => {

    test('Method exists', () => {
      expect(module.addRecord).toBeDefined();
      expect(typeof module.addRecord).toEqual('function');
      expect(isPropInModule(module, 'addRecord')).toBeTruthy();
    });

    test('Method returns module instance', () => {
      const returned = module.addRecord('key', '');
      expect(returned).toBeInstanceOf(module.constructor);
    });

    test('Add a record with key "key" and value "value"', () => {
      module.addRecord('key', 'value');
      const record = module.getRecord('key');
      expect(record).toEqual('value');
    });

    test('Add a record with a duplicate key', () => {
      module.addRecord('key', 'value');
      expect(() => module.addRecord('key', 'newValue')).toThrow();
      const record = module.getRecord('key');
      expect(record).toEqual('value');
    });

    describe('Check the incorrect key of the added record:', () => {

      test('Trying to set an empty string as a record key', () => {
        expect(() => module.addRecord('', 'value')).toThrow();
      });

      test('Trying to set a string that starts with a space as a record key', () => {
        expect(() => module.addRecord(' key', 'value')).toThrow();
      });

      test('Trying to set a non-string as a record key', () => {
        [true, false, null, undefined, 1, [], {}, () => {}].forEach(key => {
          expect(() => module.addRecord(key, 'value')).toThrow();
        });
      });

    });

    describe('Check the value of the added record:', () => {

      test('Trying to set "undefined" as a record value', () => {
        expect(() => module.addRecord('test', undefined)).toThrow();
      });

      test('Trying to set a function as a record value', () => {
        expect(() => module.addRecord('test', () => {})).toThrow();
      });

      test('Trying to set a non-function as a record value', () => {
        [true, false, null, 1, [], {}, 'val'].forEach((val, i) => {
          const key = `key${i}`;
          expect(module.addRecord(key, val).hasRecord(key)).toBeTruthy();
        });
      });

    });

  });

};

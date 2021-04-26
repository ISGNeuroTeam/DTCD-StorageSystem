import { isPropInModule } from 'utils/isPropInModule';

export default (module) => {

  beforeEach(() => module.clearModule());

  describe('Check putRecord() method:', () => {

    test('Method exists', () => {
      expect(module.putRecord).toBeDefined();
      expect(typeof module.putRecord).toEqual('function');
      expect(isPropInModule(module, 'putRecord')).toBeTruthy();
    });

    test('Method returns module instance', () => {
      const returned = module.putRecord('key', '');
      expect(returned).toBeInstanceOf(module.constructor);
    });

    test('Put a record with key "key" and value "value"', () => {
      module.putRecord('key', 'value');
      const record = module.getRecord('key');
      expect(record).toEqual('value');
    });

    test('Put a record with a duplicate key', () => {
      module.putRecord('key', 'value');
      module.putRecord('key', 'newValue');
      const record = module.getRecord('key');
      expect(record).toEqual('newValue');
    });

    describe('Check the incorrect key of the putted record:', () => {

      test('Trying to set an empty string as a record key', () => {
        expect(() => module.putRecord('', 'value')).toThrow();
      });

      test('Trying to set a string that starts with a space as a record key', () => {
        expect(() => module.putRecord(' key', 'value')).toThrow();
      });

      test('Trying to set a non-string as a record key', () => {
        [true, false, null, undefined, 1, [], {}, () => {}].forEach(key => {
          expect(() => module.putRecord(key, 'value')).toThrow();
        });
      });

    });

    describe('Check the value of the putted record:', () => {

      test('Trying to set "undefined" as a record value', () => {
        expect(() => module.putRecord('test', undefined)).toThrow();
      });

      test('Trying to set a function as a record value', () => {
        expect(() => module.putRecord('test', () => {})).toThrow();
      });

      test('Trying to set a non-function as a record value', () => {
        [true, false, null, 1, [], {}, 'val'].forEach((val, i) => {
          const key = `key${i}`;
          expect(module.putRecord(key, val).hasRecord(key)).toBeTruthy();
        });
      });

    });

  });

};

import { Plugin } from './../../src/Plugin';
import { systems } from './../utils/systems';
import { dependencies } from './../utils/dependencies';

global.Application = {
  getSystem: (name) => systems[name],
  getDependence: (name) => dependencies[name],
};

const storage = new Plugin('guid-test');

beforeEach(() => {
  storage.clearStorage();
});

describe('Check public method addRecord()', () => {

  test('Method exists', () => {
    expect(storage.addRecord).toBeDefined();
  });

  test('Add a record with key "key" and value "value"', () => {
    storage.addRecord('key', 'value');
    const record = storage.getRecord('key');
    expect(record).toEqual('value');
  });

  test('Add a record with a duplicate key ', () => {
    storage.addRecord('key', 'value');
    expect(() => storage.addRecord('key', 'newValue')).toThrow();
    const record = storage.getRecord('key');
    expect(record).toEqual('value');
  });

  describe('Check the incorrect key of the added record', () => {

    test('Trying to set a string that starts with a space as a record key', () => {
      expect(() => storage.addRecord(' ', 'value')).toThrow();
    });

    test('Trying to set an empty string as a record key', () => {
      expect(() => storage.addRecord('', 'value')).toThrow();
    });

    test('Trying to set a non-string as a record key', () => {
      [true, false, null, undefined, 1, [], {}, () => {}].forEach(key => {
        expect(() => storage.addRecord(key, 'value')).toThrow();
      });
    });

  });

  describe('Check the value of the added record', () => {

    test('Trying to set a function as a record value', () => {
      expect(() => storage.addRecord('test', () => {})).toThrow();
    });

    test('Trying to set a non-function as a record value', () => {
      [true, false, null, undefined, 1, [], {}, 'val'].forEach((val, i) => {
        expect(storage.addRecord(`key${i}`, val));
      });
    });

  });

});

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

describe('Check public method putRecord()', () => {

  test('Method exists', () => {
    expect(storage.putRecord).toBeDefined();
  });

  test('Put a record with key "key" and value "value"', () => {
    storage.putRecord('key', 'value');
    const record = storage.getRecord('key');
    expect(record).toEqual('value');
  });

  test('Put a record with a duplicate key', () => {
    storage.putRecord('key', 'value');
    storage.putRecord('key', 'newValue');
    const record = storage.getRecord('key');
    expect(record).toEqual('newValue');
  });

  describe('Check the incorrect key of the putted record', () => {

    test('Trying to set a string that starts with a space as a record key', () => {
      expect(() => storage.putRecord(' ', 'value')).toThrow();
    });

    test('Trying to set an empty string as a record key', () => {
      expect(() => storage.putRecord('', 'value')).toThrow();
    });

    test('Trying to set a non-string as a record key', () => {
      [true, false, null, undefined, 1, [], {}, () => {}].forEach(key => {
        expect(() => storage.putRecord(key, 'value')).toThrow();
      });
    });

  });

  describe('Check the value of the putted record', () => {

    test('Trying to set a function as a record value', () => {
      expect(() => storage.putRecord('test', () => {})).toThrow();
    });

    test('Trying to set a non-function as a record value', () => {
      [true, false, null, undefined, 1, [], {}, 'val'].forEach((val, i) => {
        expect(storage.putRecord(`key${i}`, val));
      });
    });

  });

});

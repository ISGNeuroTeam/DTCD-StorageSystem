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

describe('Check public method getRecord()', () => {

  test('Method exists', () => {
    expect(storage.getRecord).toBeDefined();
  });

  test('Checking to get the value of an existing record', () => {
    [true, false, 1, 'value', [1, 2], { a: 1, b: 2 }].forEach((val, i) => {
      const key = `key${i}`;
      storage.addRecord(key, val);
      const value = storage.getRecord(key);
      expect(value).toEqual(val);
    });
  });

  test('Checking to get the value of a nonexistent record', () => {
    [true, false, 1, 'value', [1, 2], { a: 1, b: 2 }].forEach((val, i) => {
      const key = `key${i}`;
      const value = storage.getRecord(key);
      expect(value).toBeUndefined();
    });
  });

});

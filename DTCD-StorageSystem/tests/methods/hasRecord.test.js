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

describe('Check public method hasRecord()', () => {

  test('Method exists', () => {
    expect(storage.hasRecord).toBeDefined();
  });

  test('Checking for an existing key', () => {
    storage.addRecord('key', 'value');
    const isExist = storage.hasRecord('key');
    const record = storage.getRecord('key');
    expect(isExist).toBeTruthy();
    expect(record).toEqual('value');
  });

  test('Checking for a nonexistent key', () => {
    const isExist = storage.hasRecord('key');
    expect(isExist).toEqual(false);
  });

});

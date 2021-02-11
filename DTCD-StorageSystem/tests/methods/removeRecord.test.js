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

describe('Check public method removeRecord()', () => {

  test('Method exists', () => {
    expect(storage.removeRecord).toBeDefined();
  });

  test('Trying to delete an existent key', () => {
    storage.addRecord('key', 1);
    const isExist = () => storage.hasRecord('key');
    expect(isExist()).toBeTruthy();
    expect(storage.removeRecord('key')).toEqual('success');
    expect(isExist()).toBeFalsy();
  });

  test('Trying to delete a non-existent key', () => {
    storage.addRecord('key', 1);
    expect(storage.removeRecord('key2')).toEqual('success');
    expect(storage.hasRecord('key')).toBeTruthy();
    expect(storage.hasRecord('key2')).toBeFalsy();
  });

});

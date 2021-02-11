import { Plugin } from './../../src/Plugin';
import { systems } from './../utils/systems';
import { dependencies } from './../utils/dependencies';

global.Application = {
  getSystem: (name) => systems[name],
  getDependence: (name) => dependencies[name],
};

const storage = new Plugin('guid-test');

describe('Check public method clearStorage()', () => {

  test('Method exists', () => {
    expect(storage.clearStorage).toBeDefined();
  });

  test('Check storage cleaning', () => {
    const values = [1, 2, 3];

    values.forEach((val, i) => {
      storage.addRecord(`key${i}`, val);
      const isExist = storage.hasRecord(`key${i}`);
      expect(isExist).toBeTruthy();
    });

    expect(storage.clearStorage()).toEqual('success');

    values.forEach((val, i) => {
      const isExist = storage.hasRecord(`key${i}`);
      expect(isExist).toBeFalsy();
    });
  });

});

import { isPropInModule } from 'utils/isPropInModule';

export default (module) => {

  beforeEach(() => module.clearModule());

  describe('Check hasRecord() method:', () => {

    test('Method exists', () => {
      expect(module.hasRecord).toBeDefined();
      expect(typeof module.hasRecord).toEqual('function');
      expect(isPropInModule(module, 'hasRecord')).toBeTruthy();
    });

    test('Checking for an existing record', () => {
      for (let i = 0; i < 10; i++) {
        const key =`key${i}`;
        module.addRecord(key, i);
        expect(module.hasRecord(key)).toBeTruthy();
        expect(module.getRecord(key)).toEqual(i);
      }
    });

    test('Checking for a non-existent record', () => {
      for (let i = 0; i < 10; i++) {
        const key =`key${i}`;
        expect(module.hasRecord(key)).toBeFalsy();
        expect(module.getRecord(key)).toBeUndefined();
      }
    });

  });

};

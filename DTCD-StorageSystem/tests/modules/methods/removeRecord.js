import { isPropInModule } from 'utils/isPropInModule';

export default (module) => {

  beforeEach(() => module.clearModule());

  describe('Check removeRecord() method:', () => {

    test('Method exists', () => {
      expect(module.removeRecord).toBeDefined();
      expect(typeof module.removeRecord).toEqual('function');
      expect(isPropInModule(module, 'removeRecord')).toBeTruthy();
    });

    test('Trying to delete an existing record', () => {
      for (let i = 0; i < 10; i++) {
        const key =`key${i}`;
        module.addRecord(key, i);
        expect(module.hasRecord(key)).toBeTruthy();
        expect(module.removeRecord(key)).toBeTruthy();
        expect(module.hasRecord(key)).toBeFalsy();
      }
    });

    test('Trying to delete a non-existent record', () => {
      for (let i = 0; i < 10; i++) {
        const key =`key${i}`;
        expect(module.hasRecord(key)).toBeFalsy();
        expect(module.removeRecord(key)).toBeFalsy();
      }
    });

  });

};

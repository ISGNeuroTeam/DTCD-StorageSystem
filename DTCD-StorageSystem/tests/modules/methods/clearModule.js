import { isPropInModule } from 'utils/isPropInModule';

export default (module) => {

  beforeEach(() => module.clearModule());

  describe('Check clearModule() method:', () => {

    test('Method exists', () => {
      expect(module.clearModule).toBeDefined();
      expect(typeof module.clearModule).toEqual('function');
      expect(isPropInModule(module, 'clearModule')).toBeTruthy();
    });

    test('Trying to clear an empty module', () => {
      expect(module.clearModule()).toEqual(0);
    });

    test('Trying to clear a non-empty module', () => {
      const records = [1, 2, 3, 4, 5];
      const recordCount = records.length;
      expect(module.recordCount).toEqual(0);
      records.forEach((val, i) => module.addRecord(`key${i}`, val));
      expect(module.recordCount).toEqual(recordCount);
      expect(module.clearModule()).toEqual(recordCount);
      expect(module.recordCount).toEqual(0);
    });


  });

};

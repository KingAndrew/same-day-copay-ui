
import { dataAPI } from '../dataAPI.js';

describe('DataAPI', () => {
  test('dataAPI should be importable', () => {
    expect(dataAPI).toBeDefined();
  });
  
  test('dataAPI should have getData function', () => {
    expect(typeof dataAPI.getData).toBe('function');
  });
});

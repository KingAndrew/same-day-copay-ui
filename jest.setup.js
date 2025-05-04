
// Mock react-native modules that aren't compatible with testing environment
jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  rn.NativeModules.StatusBarManager = { getHeight: jest.fn() };
  return rn;
});

// Mock the Audio class since it's not available in test environment
global.Audio = class {
  constructor() {
    this.play = jest.fn().mockResolvedValue();
    this.pause = jest.fn();
    this.load = jest.fn();
  }
};

import { providePresetFor } from './preset-for';

class FakeModule {}
class FakeComponent {}

jest.mock('./preset', () => ({
  providePreset: jest.fn().mockReturnValue(['preset-providers']),
}));

describe('providePresetFor() function', () => {
  it('should return passed-in module', () => {
    expect(providePresetFor(FakeModule, FakeComponent)).toEqual(
      expect.objectContaining({
        ngModule: FakeModule,
      }),
    );
  });

  it('should return passed-in component as providers from providePreset() call', () => {
    expect(providePresetFor(FakeModule, FakeComponent)).toEqual(
      expect.objectContaining({
        providers: expect.arrayContaining(['preset-providers']),
      }),
    );
  });

  it('should return passed-in optional providers concatenated', () => {
    expect(
      providePresetFor(FakeModule, FakeComponent, ['providers'] as any),
    ).toEqual(
      expect.objectContaining({
        providers: expect.arrayContaining(['preset-providers', 'providers']),
      }),
    );
  });
});

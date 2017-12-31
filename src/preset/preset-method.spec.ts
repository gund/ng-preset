import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';

import { createWithPresetMethodFor } from './preset-method';
import { PRESET_TYPES_TOKEN } from './preset-token';

class FakeModule { }
class FakeComponent { }

describe('createWithPresetMethodFor() function', () => {
  describe('returns a funtion that returns `ModuleWithProviders` and', () => {
    it('should return passed-in module', () => {
      expect(createWithPresetMethodFor(FakeModule)(null as any)).toEqual(
        expect.objectContaining({
          ngModule: FakeModule
        }));
    });

    it('should return passed-in component in `PRESET_TYPES_TOKEN` as multi-provider', () => {
      expect(createWithPresetMethodFor(FakeModule)(FakeComponent)).toEqual(
        expect.objectContaining({
          ngModule: FakeModule,
          providers: expect.arrayContaining([
            { provide: PRESET_TYPES_TOKEN, useValue: FakeComponent, multi: true },
          ])
        }));
    });

    it('should return passed-in component in `ANALYZE_FOR_ENTRY_COMPONENTS` as multi-provider', () => {
      expect(createWithPresetMethodFor(FakeModule)(FakeComponent)).toEqual(
        expect.objectContaining({
          ngModule: FakeModule,
          providers: expect.arrayContaining([
            { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: FakeComponent, multi: true },
          ])
        }));
    });
  });
});

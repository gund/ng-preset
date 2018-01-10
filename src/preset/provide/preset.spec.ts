import { ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';

import { PRESET_TYPES_TOKEN } from '../preset-token';
import { providePreset } from './preset';

class FakeComponent {}

describe('providePreset() function', () => {
  it('should return passed-in component in `PRESET_TYPES_TOKEN` as multi-provider', () => {
    expect(providePreset(FakeComponent)).toEqual(
      expect.arrayContaining([
        { provide: PRESET_TYPES_TOKEN, useValue: FakeComponent, multi: true },
      ]),
    );
  });

  it('should return passed-in component in `ANALYZE_FOR_ENTRY_COMPONENTS` as multi-provider', () => {
    expect(providePreset(FakeComponent)).toEqual(
      expect.arrayContaining([
        {
          provide: ANALYZE_FOR_ENTRY_COMPONENTS,
          useValue: FakeComponent,
          multi: true,
        },
      ]),
    );
  });
});

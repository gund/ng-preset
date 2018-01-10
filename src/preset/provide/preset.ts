import { ANALYZE_FOR_ENTRY_COMPONENTS, Provider } from '@angular/core';

import { PRESET_TYPES_TOKEN, PresetType } from '../preset-token';

export function providePreset(presetType: PresetType): Provider[] {
  return [
    { provide: PRESET_TYPES_TOKEN, useValue: presetType, multi: true },
    {
      provide: ANALYZE_FOR_ENTRY_COMPONENTS,
      useValue: presetType,
      multi: true,
    },
  ];
}

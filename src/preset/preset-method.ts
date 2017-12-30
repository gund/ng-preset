import { ANALYZE_FOR_ENTRY_COMPONENTS, ModuleWithProviders, Type } from '@angular/core';

import { PRESET_TYPES_TOKEN, PresetType } from './preset-token';

export type WithPresetMethod<T = any> = (presetType: PresetType<T>) => ModuleWithProviders;

export function createWithPresetMethodFor<T = any>(
  moduleClass: Type<any>
): WithPresetMethod<T> {
  return (presetType: PresetType<T>): ModuleWithProviders => {
    return {
      ngModule: moduleClass,
      providers: [
        { provide: PRESET_TYPES_TOKEN, useValue: presetType, multi: true },
        { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: presetType, multi: true },
      ],
    };
  };
}

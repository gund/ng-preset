import { ANALYZE_FOR_ENTRY_COMPONENTS, ModuleWithProviders, Provider, Type } from '@angular/core';

import { PRESET_TYPES_TOKEN, PresetType } from './preset-token';

export type WithPresetMethod<T = any> = (presetType: PresetType<T>) => ModuleWithProviders;

export function providePreset<T>(presetType: PresetType<T>): Provider[] {
  return [
    { provide: PRESET_TYPES_TOKEN, useValue: presetType, multi: true },
    { provide: ANALYZE_FOR_ENTRY_COMPONENTS, useValue: presetType, multi: true },
  ];
}

export function providePresetFor<T>(
  moduleClass: Type<any>,
  presetType: PresetType<T>,
  additionalProviders: Provider[] = [],
): ModuleWithProviders {
  return {
    ngModule: moduleClass,
    providers: [
      ...providePreset(presetType),
      ...additionalProviders,
    ],
  };
}

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

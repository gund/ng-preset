import { ModuleWithProviders, Provider, Type } from '@angular/core';

import { PresetType } from '../preset-token';
import { providePreset } from './preset';

export function providePresetFor(
  moduleClass: Type<any>,
  presetType: PresetType,
  additionalProviders: Provider[] = [],
): ModuleWithProviders {
  return {
    ngModule: moduleClass,
    providers: [...providePreset(presetType), ...additionalProviders],
  };
}

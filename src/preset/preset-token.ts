import { InjectionToken, Type } from '@angular/core';

export abstract class PresetType {}

export const PRESET_TYPES_TOKEN = new InjectionToken<PresetType[]>(
  'PresetTypes',
);
export const PRESET_COMPS_TOKEN = new InjectionToken<Type<any>[][]>(
  'PresetComps',
);

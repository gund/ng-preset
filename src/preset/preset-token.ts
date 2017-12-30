import { InjectionToken, Type } from '@angular/core';

// tslint:disable-next-line:no-empty-interface
export interface PresetType<T = any> extends Type<T> { }

export const PRESET_TYPES_TOKEN = new InjectionToken<PresetType[]>('PresetTypes');

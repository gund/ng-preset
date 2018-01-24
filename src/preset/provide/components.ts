import { Provider, Type } from '@angular/core';

import { PRESET_COMPS_TOKEN } from '../preset-token';

export function provideComponents(components: Type<any>[]): Provider[] {
  return [{ provide: PRESET_COMPS_TOKEN, useValue: components, multi: true }];
}

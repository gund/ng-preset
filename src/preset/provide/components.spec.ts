import { PRESET_COMPS_TOKEN } from '../preset-token';
import { provideComponents } from './components';

describe('provideComponents() function', () => {
  it('should return in providers passed in components as `PRESET_COMPS_TOKEN` multi value', () => {
    const comps = [{ __comp: 1 }, { __comp: 2 }, { __comp: 3 }];
    expect(provideComponents(comps as any)).toEqual([
      { provide: PRESET_COMPS_TOKEN, useValue: comps, multi: true },
    ]);
  });
});

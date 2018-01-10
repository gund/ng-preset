import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Type } from '@angular/core';

import { PRESET_COMPS_TOKEN } from './preset-token';
import { PresetService } from './preset.service';

@NgModule({
  imports: [CommonModule],
  exports: [],
  declarations: [],
  providers: [PresetService],
})
export class PresetModule {
  static forComponent(component: Type<any>): ModuleWithProviders {
    return PresetModule.forComponents([component]);
  }

  static forComponents(components: Type<any>[]): ModuleWithProviders {
    return {
      ngModule: PresetModule,
      providers: [
        { provide: PRESET_COMPS_TOKEN, useValue: components, multi: true },
      ],
    };
  }

  constructor(presetService: PresetService) {
    presetService.initDecoratedPresets();
  }
}

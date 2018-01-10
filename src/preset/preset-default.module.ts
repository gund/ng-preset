import { PRESET_COMPS_TOKEN } from './preset-token';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Type } from '@angular/core';

import { providePresetFor } from './provide/preset-for';
import { PresetService } from './preset.service';

@NgModule({
  imports: [CommonModule],
  exports: [],
  declarations: [],
  providers: [PresetService],
})
export class PresetDefaultModule {
  static forComponent(
    component: Type<any>,
    presetType: Type<any>,
  ): ModuleWithProviders {
    return PresetDefaultModule.forComponents([component], presetType);
  }

  static forComponents(
    components: Type<any>[],
    presetType: Type<any>,
  ): ModuleWithProviders {
    return providePresetFor(PresetDefaultModule, presetType, [
      { provide: PRESET_COMPS_TOKEN, useValue: components, multi: true },
    ]);
  }

  constructor(presetService: PresetService) {
    presetService.initDecoratedPresets();
  }
}

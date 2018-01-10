import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Type } from '@angular/core';

import { PRESET_COMPS_TOKEN, PresetType } from './preset-token';
import { PresetService } from './preset.service';
import { providePresetFor } from './provide/preset-for';

@NgModule({
  imports: [CommonModule],
  exports: [],
  declarations: [],
  providers: [PresetService],
})
export class PresetDefaultModule {
  static forComponent(
    component: Type<any>,
    presetType: Type<PresetType>,
  ): ModuleWithProviders {
    return PresetDefaultModule.forComponents([component], presetType);
  }

  static forComponents(
    components: Type<any>[],
    presetType: Type<PresetType>,
  ): ModuleWithProviders {
    return providePresetFor(PresetDefaultModule, presetType, [
      { provide: PRESET_COMPS_TOKEN, useValue: components, multi: true },
    ]);
  }

  constructor(presetService: PresetService) {
    presetService.initDecoratedPresets();
  }
}

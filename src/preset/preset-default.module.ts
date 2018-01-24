import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Type } from '@angular/core';

import { PresetType } from './preset-token';
import { PresetService } from './preset.service';
import { provideComponents, providePresetFor } from './provide';

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
    return providePresetFor(
      PresetDefaultModule,
      presetType,
      provideComponents(components),
    );
  }

  constructor(presetService: PresetService) {
    presetService.initDecoratedPresets();
  }
}

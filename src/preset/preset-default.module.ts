import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Type } from '@angular/core';

import { providePresetFor } from './preset-method';
import { PresetService } from './preset.service';

@NgModule({
  imports: [CommonModule],
  exports: [],
  declarations: [],
  providers: [PresetService],
})
export class PresetDefaultModule {

  static forComponent(component: Type<any>, presetType: Type<any>): ModuleWithProviders {
    return PresetDefaultModule.forComponents([component], presetType);
  }

  static forComponents(components: Type<any>[], presetType: Type<any>): ModuleWithProviders {
    return providePresetFor(PresetDefaultModule, presetType, [
      { provide: 'COMPS', useValue: components, multi: true },
    ]);
  }

}

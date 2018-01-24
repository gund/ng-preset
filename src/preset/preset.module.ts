import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Type } from '@angular/core';

import { PresetService } from './preset.service';
import { provideComponents } from './provide';

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
      providers: provideComponents(components),
    };
  }

  constructor(presetService: PresetService) {
    presetService.initDecoratedPresets();
  }
}

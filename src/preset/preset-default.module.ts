import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { createWithPresetMethodFor, WithPresetMethod } from './preset-method';
import { PresetService } from './preset.service';

@NgModule({
  imports: [CommonModule],
  exports: [],
  declarations: [],
  providers: [PresetService],
})
export class PresetDefaultModule {
  static withPreset: WithPresetMethod = createWithPresetMethodFor(PresetDefaultModule);
}

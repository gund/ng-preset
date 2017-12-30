import { NgModule } from '@angular/core';

import { createWithPresetMethodFor, PresetModule } from '../../preset';
import { MyComponentModule } from './my-component.module';
import { MyPreset } from './my-preset';

@NgModule({
  imports: [
    PresetModule,
    MyComponentModule,
  ],
  exports: [MyComponentModule],
})
export class MyCustomModule {
  static withPreset = createWithPresetMethodFor<MyPreset>(MyCustomModule);
}

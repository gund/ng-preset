import { NgModule } from '@angular/core';

import { PresetDefaultModule } from '../../preset';
import { MyComponentModule } from './my-component.module';
import { MyPresetDefaultComponent } from './my-preset-default/my-preset-default.component';

@NgModule({
  imports: [
    MyComponentModule,
    PresetDefaultModule.withPreset(MyPresetDefaultComponent),
  ],
  exports: [MyComponentModule],
  declarations: [MyPresetDefaultComponent],
})
export class MyModule { }

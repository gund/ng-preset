import { ModuleWithProviders, NgModule, Type } from '@angular/core';

import { PresetModule, providePresetFor } from '../../preset';
import { MyComponentModule } from './my-component.module';
import { MyPreset } from './my-preset';
import { MyComponent } from './my.component';

@NgModule({
  imports: [MyComponentModule, PresetModule.forComponent(MyComponent)],
  exports: [MyComponentModule],
})
export class MyCustomModule {
  static withPreset(presetType: Type<MyPreset>): ModuleWithProviders {
    return providePresetFor(MyCustomModule, presetType);
  }
}

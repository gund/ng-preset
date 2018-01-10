import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MyPresetOneComponent } from './my-preset-one/my-preset-one.component';
import { MyCustomModule } from './my/my-custom.module';
import { MyModule } from './my/my.module';

@NgModule({
  declarations: [AppComponent, MyPresetOneComponent],
  imports: [
    BrowserModule,
    MyModule, // This is normal use-case
    // MyCustomModule.withPreset(MyPresetOneComponent), // Uncomment this
    // to override default preset
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

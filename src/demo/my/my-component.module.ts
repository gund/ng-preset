import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MyComponent } from './my.component';

@NgModule({
  imports: [CommonModule],
  exports: [MyComponent],
  declarations: [MyComponent],
})
export class MyComponentModule { }

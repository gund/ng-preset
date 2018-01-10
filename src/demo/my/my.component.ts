import { Component } from '@angular/core';

import { Preset } from '../../preset';
import { MyPreset } from './my-preset';

@Component({
  selector: 'prst-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.css'],
})
export class MyComponent {
  @Preset() presetComp: MyPreset;
}

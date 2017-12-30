import { Component } from '@angular/core';

import { PresetService } from '../../preset';
import { MyPreset } from './my-preset';

@Component({
  selector: 'prst-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.css']
})
export class MyComponent {

  presetComp = this.presetService.getPreset<MyPreset>();

  constructor(
    private presetService: PresetService,
  ) { }

}

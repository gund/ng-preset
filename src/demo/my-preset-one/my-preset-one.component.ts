import { Component, TemplateRef, ViewChild } from '@angular/core';

import { MyPreset } from '../my/my-preset';

@Component({
  selector: 'prst-my-preset-one',
  templateUrl: './my-preset-one.component.html',
  styleUrls: ['./my-preset-one.component.css']
})
export class MyPresetOneComponent implements MyPreset {
  @ViewChild('headerTpl') headerTpl: TemplateRef<any>;
  @ViewChild('contentTpl') contentTpl: TemplateRef<any>;
  @ViewChild('footerTpl') footerTpl: TemplateRef<any>;
}

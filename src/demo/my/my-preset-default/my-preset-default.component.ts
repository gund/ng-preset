import { Component, TemplateRef, ViewChild } from '@angular/core';

import { MyPreset } from '../my-preset';

@Component({
  selector: 'prst-my-preset-default',
  templateUrl: './my-preset-default.component.html',
  styleUrls: ['./my-preset-default.component.css'],
})
export class MyPresetDefaultComponent extends MyPreset {
  @ViewChild('headerTpl') headerTpl: TemplateRef<any>;
  @ViewChild('contentTpl') contentTpl: TemplateRef<any>;
  @ViewChild('footerTpl') footerTpl: TemplateRef<any>;
}

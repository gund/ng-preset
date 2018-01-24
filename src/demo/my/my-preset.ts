import { TemplateRef } from '@angular/core';

import { PresetType } from '../../preset';

export abstract class MyPreset extends PresetType {
  headerTpl: TemplateRef<any>;
  contentTpl: TemplateRef<any>;
  footerTpl: TemplateRef<any>;
}

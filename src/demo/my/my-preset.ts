import { TemplateRef } from '@angular/core';

export interface MyPreset {
  headerTpl: TemplateRef<any>;
  contentTpl: TemplateRef<any>;
  footerTpl: TemplateRef<any>;
}

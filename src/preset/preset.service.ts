import { ComponentFactoryResolver, ComponentRef, Injectable, Injector, OnDestroy } from '@angular/core';

import { PRESET_TYPES_TOKEN, PresetType } from './preset-token';

@Injectable()
export class PresetService implements OnDestroy {

  private presetTypes = this.injector.get(PRESET_TYPES_TOKEN);
  private presetCompRefs: ComponentRef<any>[] = [];
  private finalPresetComp: any;

  constructor(
    private injector: Injector,
    private compResolver: ComponentFactoryResolver,
  ) { }

  getPreset<T = any>(): T {
    if (this.presetTypes.length && !this.presetCompRefs.length) {
      this.presetCompRefs = this.presetTypes
        .map(presetType => this.createCompFromType(presetType));
    }

    if (!this.finalPresetComp) {
      this.finalPresetComp = this.mergeCompRefs(this.presetCompRefs);
    }

    return this.finalPresetComp;
  }

  /** @internal */
  ngOnDestroy() {
    this.presetCompRefs
      .forEach(presetCompRef => presetCompRef.destroy());
    this.presetCompRefs = [];
  }

  private createCompFromType<T>(type: PresetType<T>) {
    return this.compResolver
      .resolveComponentFactory(type)
      .create(this.injector);
  }

  private mergeCompRefs<T>(compRefs: ComponentRef<T>[]): T {
    return compRefs.reduce((comp, compRef) =>
      Object.assign(comp, compRef.instance), {} as T);
  }

}

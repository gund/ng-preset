import {
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
  OnDestroy,
  Type,
} from '@angular/core';

import { getPresetMetadataFrom, PresetMetadata } from './metadata/preset';
import {
  PRESET_COMPS_TOKEN,
  PRESET_TYPES_TOKEN,
  PresetType,
} from './preset-token';
import { EMPTY_VAL, hasTypeAsProto, isEmptyVal } from './utils';

interface TypeWithPresetMetadata<T = any> {
  type: Type<T>;
  metadata: PresetMetadata[];
}

@Injectable()
export class PresetService implements OnDestroy {
  private presetCompRefs: ComponentRef<any>[] = [];
  private finalPresetComp: any;
  private presetsInit = false;

  private get presetTypes() {
    return this.injector.get(PRESET_TYPES_TOKEN);
  }

  private get components() {
    return this.injector
      .get(PRESET_COMPS_TOKEN)
      .reduce((comps, compsInner) => [...comps, ...compsInner], []);
  }

  private static resolvePresetTypeMetadata<T>(
    type: Type<T>,
  ): TypeWithPresetMetadata<T> {
    return {
      type,
      metadata: getPresetMetadataFrom(type),
    };
  }

  private static isPresetMetadataExist<T>(
    data: TypeWithPresetMetadata<T>,
  ): boolean {
    return !!data.metadata.length;
  }

  constructor(
    private injector: Injector,
    private compResolver: ComponentFactoryResolver,
  ) {}

  getPreset<T = any>(): T {
    if (this.presetTypes.length && !this.presetCompRefs.length) {
      this.presetCompRefs = this.presetTypes
        .filter(hasTypeAsProto.bind(null, PresetType))
        .map(presetType => this.createCompFromType(presetType));
    }

    if (!this.finalPresetComp) {
      this.finalPresetComp = this.mergeCompRefs(this.presetCompRefs);
    }

    return this.finalPresetComp;
  }

  /** @internal */
  ngOnDestroy() {
    this.presetCompRefs.forEach(presetCompRef => presetCompRef.destroy());
    this.presetCompRefs = [];
  }

  /** @internal */
  initDecoratedPresets() {
    if (this.presetsInit) {
      return;
    }

    this.components
      .map(PresetService.resolvePresetTypeMetadata)
      .filter(PresetService.isPresetMetadataExist)
      .forEach(type => this.initPresetsOn(type));

    this.presetsInit = true;
  }

  private createCompFromType(type: PresetType) {
    return this.compResolver
      .resolveComponentFactory(type as any)
      .create(this.injector);
  }

  private mergeCompRefs<T>(compRefs: ComponentRef<T>[]): T {
    const proto = compRefs.reduce(
      (comp, compRef) =>
        Object.assign(comp, compRef.instance.constructor.prototype),
      {},
    );

    return compRefs.reduce(
      (comp, compRef) => Object.assign(comp, compRef.instance),
      proto as T,
    );
  }

  private initPresetsOn({ type, metadata }: TypeWithPresetMetadata) {
    metadata.forEach(data => this.initPresetOn(type, data));
  }

  private initPresetOn(type: Type<any>, metadata: PresetMetadata) {
    let value: any = EMPTY_VAL;
    const get = () => (isEmptyVal(value) ? (value = this.getPreset()) : value);
    const set = (val: any) => (value = val);

    if (delete type.prototype[metadata.propName]) {
      Object.defineProperty(type.prototype, metadata.propName, {
        get,
        set,
        configurable: true,
        enumerable: true,
      });
    }
  }
}

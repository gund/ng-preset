import {
  ChangeDetectorRef,
  Component,
  NgModule,
  OnDestroy,
  Provider,
} from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { PRESET_TYPES_TOKEN, PresetType } from './preset-token';
import { PresetService } from './preset.service';

@Component({ selector: 'prst-mock-preset', template: '' })
class MockPresetComponent extends PresetType {
  mockPreset = true;
  constructor(private cdr: ChangeDetectorRef) {
    super();
  }
  isDestroyed() {
    try {
      // Will throw once the view was destroyed
      this.cdr.detectChanges();
    } catch (e) {
      return true;
    }
    return false;
  }
}

@Component({ selector: 'prst-mock-preset2', template: '' })
class MockPreset2Component extends PresetType {
  mockPreset2 = true;
}

@Component({ selector: 'prst-mock-preset3', template: '' })
class MockPreset3Component extends PresetType {
  mockPreset3 = true;
}

@Component({ selector: 'prst-mock-preset-invalid', template: '' })
class MockPresetInvalidComponent {
  mockPresetInvalid = true;
}

@NgModule({
  declarations: [
    MockPresetComponent,
    MockPreset2Component,
    MockPreset3Component,
    MockPresetInvalidComponent,
  ],
  entryComponents: [
    MockPresetComponent,
    MockPreset2Component,
    MockPreset3Component,
    MockPresetInvalidComponent,
  ],
})
class MockPresetModule {}

describe('Service: Preset', () => {
  let service: PresetService;
  let extraProviders: Provider[] = [];

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [MockPresetModule],
        providers: [PresetService, ...extraProviders],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    service = TestBed.get(PresetService);
  });

  it('should be created without errors', () => {
    expect(service).toBeTruthy();
  });

  describe('getPreset() method', () => {
    describe('without `PRESET_TYPES_TOKEN`', () => {
      it('should throw', () => {
        expect(() => service.getPreset()).toThrow();
      });
    });

    describe('with `PRESET_TYPES_TOKEN`', () => {
      beforeAll(
        () =>
          (extraProviders = [
            {
              provide: PRESET_TYPES_TOKEN,
              useValue: MockPresetComponent,
              multi: true,
            },
          ]),
      );

      afterAll(() => (extraProviders = []));

      it('should return instantiated component from `PRESET_TYPES_TOKEN`', () => {
        const comp = service.getPreset<MockPresetComponent>();
        expect(comp.mockPreset).toBeTruthy();
        expect(comp.isDestroyed).toBeDefined();
      });

      it('should reuse already created component', () => {
        const comp = service.getPreset<MockPresetComponent>();
        expect(comp.mockPreset).toBeTruthy();
        const comp2 = service.getPreset<MockPresetComponent>();
        expect(comp).toBe(comp2);
      });

      it('should destroy component', () => {
        const comp = service.getPreset<MockPresetComponent>();
        service.ngOnDestroy();
        expect(comp.isDestroyed()).toBeTruthy();
      });
    });

    describe('with multiple `PRESET_TYPES_TOKEN`', () => {
      beforeAll(
        () =>
          (extraProviders = [
            {
              provide: PRESET_TYPES_TOKEN,
              useValue: MockPresetComponent,
              multi: true,
            },
            {
              provide: PRESET_TYPES_TOKEN,
              useValue: MockPreset2Component,
              multi: true,
            },
            {
              provide: PRESET_TYPES_TOKEN,
              useValue: MockPreset3Component,
              multi: true,
            },
          ]),
      );

      afterAll(() => (extraProviders = []));

      it('should return instantiated merged component from `PRESET_TYPES_TOKEN`', () => {
        type AllPresets = MockPresetComponent &
          MockPreset2Component &
          MockPreset3Component;
        const comp = service.getPreset<AllPresets>();
        expect(comp.mockPreset).toBeTruthy();
        expect(comp.isDestroyed).toBeDefined();
        expect(comp.mockPreset2).toBeTruthy();
        expect(comp.mockPreset3).toBeTruthy();
      });
    });

    describe('with invalid `PRESET_TYPES_TOKEN` token', () => {
      beforeAll(
        () =>
          (extraProviders = [
            {
              provide: PRESET_TYPES_TOKEN,
              useValue: MockPresetComponent,
              multi: true,
            },
            {
              provide: PRESET_TYPES_TOKEN,
              useValue: MockPresetInvalidComponent,
              multi: true,
            },
          ]),
      );

      afterAll(() => (extraProviders = []));

      it('should only return valid instantiates comp', () => {
        type AllPresets = MockPresetComponent & MockPresetInvalidComponent;
        const comp = service.getPreset<AllPresets>();
        expect(comp.mockPreset).toBeTruthy();
        expect(comp.mockPresetInvalid).toBeUndefined();
      });
    });
  });
});

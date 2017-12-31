import { ChangeDetectorRef, Component, NgModule, OnDestroy, Provider } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { PRESET_TYPES_TOKEN } from './preset-token';
import { PresetService } from './preset.service';

@Component({ selector: 'prst-mock-preset', template: '' })
class MockPresetComponent {
  mockPreset = true;
  constructor(private cdr: ChangeDetectorRef) { }
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
class MockPreset2Component {
  mockPreset2 = true;
}

@Component({ selector: 'prst-mock-preset3', template: '' })
class MockPreset3Component {
  mockPreset3 = true;
}

@NgModule({
  declarations: [
    MockPresetComponent,
    MockPreset2Component,
    MockPreset3Component,
  ],
  entryComponents: [
    MockPresetComponent,
    MockPreset2Component,
    MockPreset3Component,
  ],
})
class MockPresetModule { }

describe('Service: Preset', () => {
  let service: PresetService;
  let extraProviders: Provider[] = [];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MockPresetModule],
      providers: [
        PresetService,
        ...extraProviders,
      ]
    }).compileComponents();
  }));

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
      beforeAll(() => extraProviders = [
        { provide: PRESET_TYPES_TOKEN, useValue: MockPresetComponent, multi: true },
      ]);

      afterAll(() => extraProviders = []);

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
      beforeAll(() => extraProviders = [
        { provide: PRESET_TYPES_TOKEN, useValue: MockPresetComponent, multi: true },
        { provide: PRESET_TYPES_TOKEN, useValue: MockPreset2Component, multi: true },
        { provide: PRESET_TYPES_TOKEN, useValue: MockPreset3Component, multi: true },
      ]);

      afterAll(() => extraProviders = []);

      it('should return instantiated merged component from `PRESET_TYPES_TOKEN`', () => {
        type AllPresets = MockPresetComponent & MockPreset2Component & MockPreset3Component;
        const comp = service.getPreset<AllPresets>();
        expect(comp.mockPreset).toBeTruthy();
        expect(comp.isDestroyed).toBeDefined();
        expect(comp.mockPreset2).toBeTruthy();
        expect(comp.mockPreset3).toBeTruthy();
      });
    });
  });

});

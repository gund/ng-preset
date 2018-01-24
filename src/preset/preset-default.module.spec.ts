import { async, TestBed } from '@angular/core/testing';

import { PresetDefaultModule } from './preset-default.module';
import { PresetService } from './preset.service';
import { PresetServiceMock } from './preset.service.mock';
import { provideComponents, providePresetFor } from './provide';

jest.mock('./provide', () => ({
  providePresetFor: jest.fn().mockReturnValue('mocked-preset-for'),
  provideComponents: jest.fn().mockReturnValue('mocked-provided-comps'),
}));

describe('PresetDefaultModule', () => {
  describe('static forComponents() method', () => {
    it('should return result from call to providePresetFor() with it`s module, type and call to provideComponents() with comps arg', () => {
      const comps = [{ comp: 1 }, { comp: 2 }] as any;
      const type = { __type: true } as any;

      expect(PresetDefaultModule.forComponents(comps, type)).toBe(
        'mocked-preset-for',
      );
      expect(provideComponents).toHaveBeenCalledWith(comps);
      expect(providePresetFor).toHaveBeenCalledWith(
        PresetDefaultModule,
        type,
        'mocked-provided-comps',
      );
    });
  });

  describe('static forComponent() method', () => {
    it('should call forComponents() with passed comp wrapped in array and type', () => {
      const comp = { comp: 1 } as any;
      const type = { __type: true } as any;

      spyOn(PresetDefaultModule, 'forComponents').and.returnValue(
        'mocked-comps',
      );

      expect(PresetDefaultModule.forComponent(comp, type)).toBe('mocked-comps');
      expect(PresetDefaultModule.forComponents).toHaveBeenCalledWith(
        [comp],
        type,
      );
    });
  });

  describe('constructor', () => {
    it(
      'should inject PresetService and call initDecoratedPresets()',
      async(() => {
        TestBed.configureTestingModule({
          imports: [PresetDefaultModule],
          providers: [{ provide: PresetService, useClass: PresetServiceMock }],
        }).compileComponents();

        const presetModule = TestBed.get(PresetDefaultModule);
        const presetServiceMock = TestBed.get(
          PresetService,
        ) as PresetServiceMock;

        expect(presetModule).toBeTruthy();
        expect(presetServiceMock.initDecoratedPresets).toHaveBeenCalledTimes(1);
      }),
    );
  });
});

import { async, TestBed } from '@angular/core/testing';

import { PresetModule } from './preset.module';
import { PresetService } from './preset.service';
import { PresetServiceMock } from './preset.service.mock';
import { provideComponents } from './provide';

jest.mock('./provide', () => ({
  provideComponents: jest.fn().mockReturnValue('mocked-comps'),
}));

describe('PresetModule', () => {
  describe('static forComponents() method', () => {
    it('should return module with providers where providers are set to provideComponents with components arg', () => {
      const comps = [{ comp: 1 }, { comp: 2 }] as any;

      expect(PresetModule.forComponents(comps)).toEqual({
        ngModule: PresetModule,
        providers: 'mocked-comps',
      });
      expect(provideComponents).toHaveBeenCalledWith(comps);
    });
  });

  describe('static forComponent() method', () => {
    it('should call forComponents() with passed comp wrapped in array', () => {
      const comp = 'my-component' as any;

      spyOn(PresetModule, 'forComponents').and.returnValue('mocked-result');

      expect(PresetModule.forComponent(comp)).toBe('mocked-result');
      expect(PresetModule.forComponents).toHaveBeenCalledWith([comp]);
    });
  });

  describe('constructor', () => {
    it(
      'should inject PresetService and call initDecoratedPresets()',
      async(() => {
        TestBed.configureTestingModule({
          imports: [PresetModule],
          providers: [{ provide: PresetService, useClass: PresetServiceMock }],
        }).compileComponents();

        const presetModule = TestBed.get(PresetModule);
        const presetServiceMock = TestBed.get(
          PresetService,
        ) as PresetServiceMock;

        expect(presetModule).toBeTruthy();
        expect(presetServiceMock.initDecoratedPresets).toHaveBeenCalledTimes(1);
      }),
    );
  });
});

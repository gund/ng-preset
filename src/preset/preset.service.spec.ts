import { inject, TestBed } from '@angular/core/testing';

import { PRESET_TYPES_TOKEN } from './preset-token';
import { PresetService } from './preset.service';

class MockPreset { }

describe('Service: Preset', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PRESET_TYPES_TOKEN, useValue: MockPreset, multi: true },
        PresetService,
      ]
    });
  });

  it('should ...', inject([PresetService], (service: PresetService) => {
    expect(service).toBeTruthy();
  }));
});

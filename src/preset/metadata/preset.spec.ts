import {
  getPresetMetadataFrom,
  PRESET_METADATA_KEY,
  setPresetMetadataOn,
} from './preset';

describe('setPresetMetadataOn() function', () => {
  it('should set metadata on type`s prototype under `PRESET_METADATA_KEY`', () => {
    const metadata = { __medatadta: true };
    const t = getFakeType();

    setPresetMetadataOn(t, metadata as any);

    expect(t[PRESET_METADATA_KEY]).toEqual([metadata]);
  });

  it('should set array of metadata on type`s prototype under `PRESET_METADATA_KEY`', () => {
    const metadata = { __medatadta: true };
    const metadata2 = { __medatadta2: true };
    const t = getFakeType();

    setPresetMetadataOn(t, [metadata, metadata2] as any);

    expect(t[PRESET_METADATA_KEY]).toEqual([metadata, metadata2]);
  });

  it('should preserve previously set metadata on type`s prototype under `PRESET_METADATA_KEY`', () => {
    const metadata = { __medatadta: true };
    const metadata2 = { __medatadta2: true };
    const t = getFakeType();

    setPresetMetadataOn(t, metadata as any);
    expect(t[PRESET_METADATA_KEY]).toEqual([metadata]);

    setPresetMetadataOn(t, metadata2 as any);
    expect(t[PRESET_METADATA_KEY]).toEqual([metadata, metadata2]);
  });
});

describe('getPresetMetadataFrom() function', () => {
  it('should return metadata from type under `PRESET_METADATA_KEY`', () => {
    const metadata = { __metadata: true };
    const t = getFakeType();
    setPresetMetadataOn(t, metadata as any);

    expect(getPresetMetadataFrom({ prototype: t })).toEqual([metadata]);
  });
});

function getFakeType(): any {
  return class {};
}

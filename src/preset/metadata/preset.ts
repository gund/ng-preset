export const PRESET_METADATA_KEY = '__Preset-Key__';

export interface PresetMetadata {
  propName: string | symbol;
  options?: PresetMetadataOptions;
}

// tslint:disable-next-line:no-empty-interface
export interface PresetMetadataOptions {}

export function setPresetMetadataOn(
  type: any,
  metadata: PresetMetadata | PresetMetadata[],
) {
  if (!Array.isArray(metadata)) {
    metadata = [metadata];
  }

  const ctor = type.constructor;
  const existingMetadata = ctor[PRESET_METADATA_KEY] || [];
  ctor[PRESET_METADATA_KEY] = [...existingMetadata, ...metadata];
}

export function getPresetMetadataFrom(type: any): PresetMetadata[] {
  return type[PRESET_METADATA_KEY] || [];
}

export function Preset(options?: PresetMetadataOptions): PropertyDecorator {
  return (target, propName) =>
    setPresetMetadataOn(target, {
      propName,
      options,
    });
}

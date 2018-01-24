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

  const existingMetadata = type[PRESET_METADATA_KEY] || [];
  type[PRESET_METADATA_KEY] = [...existingMetadata, ...metadata];
}

export function getPresetMetadataFrom(type: any): PresetMetadata[] {
  const proto = type.prototype || (type.prototype = {});
  return proto[PRESET_METADATA_KEY] || [];
}

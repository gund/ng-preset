import { PresetMetadataOptions, setPresetMetadataOn } from './preset';

export function Preset(options?: PresetMetadataOptions): PropertyDecorator {
  return (target, propName) =>
    setPresetMetadataOn(target, {
      propName,
      options,
    });
}

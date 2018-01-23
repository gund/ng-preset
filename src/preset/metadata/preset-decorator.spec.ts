import { PresetMetadata, setPresetMetadataOn } from './preset';
import { Preset } from './preset-decorator';

jest.mock('./preset');

describe('Preset decorator', () => {
  it('should return prop decorator and call `setPresetMetadataOn` with target and metadata obj', () => {
    const options = { __options: true };
    const propName = 'propertyName';
    const t = { constructor: {} } as any;
    Preset(options)(t, propName);

    expect(setPresetMetadataOn).toHaveBeenCalledWith(t, <PresetMetadata>{
      propName,
      options,
    });
  });
});

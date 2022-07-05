import { IConverter } from '../interfaces';
import { RenditionsConverterDto } from '../dto';
import { AudioConverter, VideoConverter } from '../converters';

export class RenditionsConverterFactory {

  static createForInfo(renditionsConverterDto: RenditionsConverterDto): IConverter {
    if (renditionsConverterDto.info[0].type === 'audio') return new AudioConverter(renditionsConverterDto);
    if (renditionsConverterDto.info[0].type === 'video') return new VideoConverter(renditionsConverterDto);
  }

}

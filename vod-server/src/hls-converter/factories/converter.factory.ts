import { IConverter } from '../interfaces';
import { SubtitleConverter } from '../converters';
import { ConverterDto } from '../dto';

export class ConverterFactory {

  static createForInfo(converterDto: ConverterDto): IConverter {
    if (converterDto.info.type === 'subtitle') return new SubtitleConverter(converterDto);
    // throw new Error(`'${ converterDto.info.type }' is not an acceptable value for info.type`)
  }

}

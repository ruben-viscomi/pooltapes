import { BaseConverter } from './base-converter.abstract';

import { ConverterDto } from '../dto';

export abstract class Converter<T> extends BaseConverter {

  protected _info: T;

  constructor(converterDto: ConverterDto) {
    const {id, filePath, info } = converterDto;
    super(id, filePath);
    this._info = <T>info;
  }

}

import { BaseConverter } from './base-converter.abstract';
import { RenditionsConverterDto } from '../dto';

export abstract class RenditionsConverter<T> extends BaseConverter {

  protected _info: T[];
  protected _streamIndex: number;

  constructor(renditionsConverterDto: RenditionsConverterDto) {
    const { id, filePath, info, streamIndex } = renditionsConverterDto;
    super(id, filePath);
    this._info = info;
    this._streamIndex = streamIndex;
  }

}

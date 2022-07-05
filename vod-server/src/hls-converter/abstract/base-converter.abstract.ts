export abstract class BaseConverter {

  protected _id: string;
  protected _filePath: string;

  constructor(id: string, filePath: string) {
    this._id = id;
    this._filePath = filePath;
  }

}

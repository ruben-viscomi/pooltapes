import * as fs from 'fs';
import * as path from 'path';

export function createFolderSafe(path: string): void {
  if (!fs.existsSync(path)) fs.mkdirSync(path);
}

export function deleteFileSafe(path: string): void {
  if (fs.existsSync(path)) fs.unlinkSync(path);
}

export function readFileData(path: string): Promise<string> {
  return new Promise<string>(async (resolve, reject) => {
    if (fs.existsSync(path))
      fs.readFile(path, 'utf8', (err: any, data: Buffer) => {
        if (err) reject(err);
        resolve(data.toString('utf8'));
      });
    else reject('File doesn\'t exists.');
  });
}

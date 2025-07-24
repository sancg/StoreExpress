import fs from 'node:fs';
import rootPath from '../utils/paths';
import { extname, join } from 'node:path';
import { ICallback } from '../types/types';

export default class Connection {
  constructor(private readonly dirPath: string = rootPath + '/db/products.json') {}

  static getFile(cb: ICallback, path?: string) {
    const dirPath = path ?? new Connection().dirPath;

    return fs.access(dirPath, (error) => {
      if (!error) {
        return fs.readFile(dirPath, (error, data) => {
          if (!error) {
            try {
              const retrieve = String(data);
              return cb({ data: JSON.parse(retrieve), path: dirPath });
            } catch (error) {
              return cb({ error, path: dirPath });
            }
          }
          cb({ error, path: dirPath });
        });
      }

      if (extname(dirPath)) {
        return fs.mkdir(join(dirPath, '../'), { recursive: true }, (error) => {
          if (!error) {
            return fs.writeFile(dirPath, '[]', (error) => {
              if (!error) {
                return cb({ message: 'File Created!', data: [], path: dirPath });
              }

              cb({ error, message: 'Error creating file!', path: dirPath });
            });
          }

          cb({ error, path: dirPath });
        });
      }

      cb({
        error,
        message: 'All checks on _getFile failed, please test again :)',
        path: dirPath,
      });
    });
  }
}

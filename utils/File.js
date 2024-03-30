import fs from 'node:fs';
import { extname, join } from 'node:path';

export default class File {
  constructor(path = process.cwd()) {
    this.path = path;
  }
  /**
   *
   * @param {string} path
   * @param {function} cb it returns a Callback with { error, data, path, message }
   */
  _getFile(path, cb) {
    return fs.access(path, (error) => {
      if (!error) {
        return fs.readFile(path, (error, data) => {
          if (!error) {
            return cb({ data: JSON.parse(data), path });
          }

          cb({ error, path });
        });
      }

      if (extname(path)) {
        return fs.mkdir(join(path, '../'), { recursive: true }, (error) => {
          if (!error) {
            return fs.writeFile(path, '[]', (error) => {
              if (!error) {
                return cb({ message: 'File Created!', data: [], path });
              }

              cb({ error, message: 'Error creating file!' });
            });
          }

          cb({ error });
        });
      }

      cb({ error, message: 'All checks on _getFile failed, please test again :)' });
    });
  }
}

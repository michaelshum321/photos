import { promises as fs } from 'fs';
import { type Stream } from 'stream';

const DEFAULT_PATH = './public/stuff/';

class FileRepo {
    async create(contents: Stream) {
        await this.mkdir();
        const path = String.fromCharCode(Math.floor(Math.random() * 26) + 'a'.charCodeAt(0));
        await fs.writeFile(`${DEFAULT_PATH}${path}`, contents);
        return path;
    }

    async mkdir() {
        try {
            await fs.access(DEFAULT_PATH);
        } catch (e) {
            // dir does not exist.
            await fs.mkdir(DEFAULT_PATH);
        }
    }

    async read(path: string) {
        await fs.readFile(path);
    }
}

export const filerepo = new FileRepo();
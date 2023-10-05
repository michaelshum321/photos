import { promises as fs } from 'fs';
import { type Stream } from 'stream';

const DB_PATH = '/stuff/';
const DEFAULT_PATH = './public/stuff/';

class FileRepo {
    async create(contents: Buffer, extension: string) {
        await this.mkdir();

        const filename = `${this.randomPath()}${extension}`;
        const path =`${DEFAULT_PATH}${filename}`
        await fs.writeFile(path, contents);
        return `${DB_PATH}${filename}`;
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
        return await fs.readFile(path);
    }
    private randomPath(): string {
        const randomChar = () => String.fromCharCode(Math.floor(Math.random() * 26) + 'a'.charCodeAt(0));
        return new Array(6).fill(null).map(randomChar).join('');
    }
}

export const filerepo = new FileRepo();
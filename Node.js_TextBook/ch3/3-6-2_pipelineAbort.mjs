import { pipeline } from 'stream/promises';
import zlib from 'zlib';
import fs from 'fs';

const ac = new AbortController();
const signal = ac.signal;

setTimeout(() => ac.abort(), 1);

try {
    await pipeline(
        fs.createReadStream('./3-6-2_readme4.txt'),
        zlib.createGzip(),
        fs.createWriteStream('./3-6-2_readme4.txt.gz'),
        { signal },
    )
}
catch (err) {
    console.error(err);
}
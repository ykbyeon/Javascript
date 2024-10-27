import { pipeline } from 'stream/promises';
import zlib from 'zlib';
import fs from 'fs';

await pipeline(
    fs.createReadStream('./3-6-2_readme4.txt'),
    zlib.createGzip(),
    fs.createWriteStream('./3-6-2_writeme4.txt.gz'),
);


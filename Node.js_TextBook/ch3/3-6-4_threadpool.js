const crypto = require('crypto');

const pass = 'pass';
const salt = 'salt';
const start = Date.now();

const thread_count = 10

for (let i = 0; i < thread_count; i++) {
    crypto.pbkdf2(pass, salt, 1000000, 128, 'sha512', (err, key) => {
        console.log(`${i}: `, Date.now() - start, key);
    })
}


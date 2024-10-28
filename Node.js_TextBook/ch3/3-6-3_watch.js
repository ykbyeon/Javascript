const fs = require('fs');

fs.watch('./3-6-3_target.txt', (eventType, filename) => {
    console.log(eventType, filename);
});
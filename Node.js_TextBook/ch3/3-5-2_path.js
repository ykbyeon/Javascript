const path = require('path');

const string = __filename;

console.log('path.sep:', path.sep);
console.log('path.delimiter:', path.delimiter);
console.log("===================");
console.log('path.dirname():', path.dirname(string));


console.log('path.isAbsolute(c:\\):', path.isAbsolute('C:\\'));


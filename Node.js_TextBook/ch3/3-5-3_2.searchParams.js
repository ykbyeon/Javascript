const myURL = new URL('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');

console.log('searchParams:', myURL.searchParams);
console.log('searchParams.getAll():', myURL.searchParams.getAll('category'));
console.log('searchParams.get():', myURL.searchParams.get('category'));
console.log('searchParmas.get():', myURL.searchParams.get('limit'));
console.log('searchParmas.has():', myURL.searchParams.has('page'));

console.log('searchParmas.keys():', myURL.searchParams.keys());
console.log('searchParmas.values():', myURL.searchParams.values());

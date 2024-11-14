const liElements = document.getElementsByTagName('li'); // li태그 모두 선택
console.log(liElements);

// for...of...
for(const liElement of liElements) {
    console.log(liElement, liElement.textContent);
    console.log(liElement.textContent);
}


// for...of...
console.log('----------------');
for(let i=0; i< liElements.length;i++){
    console.log(liElements[i].textContent);
}

// forEach() 함수 적용
const arr = [...liElements];
arr.forEach()
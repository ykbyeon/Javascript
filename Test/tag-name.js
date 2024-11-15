const liElements = document.getElementsByTagName('li'); // li태그 모두 선택
console.log(liElements);

// for...of...
for (const liElement of liElements) {
    console.log(liElement, liElement.textContent);
    console.log(liElement.textContent);
}


// for...of...
console.log('----------------');
for (let i = 0; i < liElements.length; i++) {
    console.log(liElements[i].textContent);
}

// forEach() 함수 적용 #1
console.log('----------------');
const arr = [...liElements];    //스프레드문법
arr.forEach(li => {
    console.log(li.textContent);
});

// forEach() 함수 적용 #2
console.log('----------------');
const liElementsArray = Array.from(liElements);
liElementsArray.forEach(li => {
    console.log(li.textContent);
});
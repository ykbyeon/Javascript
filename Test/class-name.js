console.log("class-name.js");
const liElements = document.getElementsByClassName("a");
console.log(liElements);


/* 유사 배열의 특징 */

// 속성을 통해 요소의 수를 확인할 수 있음
console.log(liElements.length); // 3

// 요소에 인덱스를 사용하여 접근할 수 있음
console.log(liElements[0].textContent); // "김밥"



/* 진짜 JavaScript 배열 아님 */

// forEach() 메서드 사용 시 에러 발생
/* liElements.array.forEach(element => { // Uncaught TypeError
    // some code here
    console.log(element);
}); */




console.log("-----------------");
for (const liElement of liElements) {
    console.log(liElement.textContent);
}

console.log("-----------------");
for (let i = 0; i < liElements.length; i++) {
    console.log(liElements[i].textContent);
}

console.log("-----------------");
const arr = [...liElements];
arr.forEach(li => {
    console.log(li.textContent);
});

console.log("-----------------");
const liElementsArray = Array.from(liElements);
liElementsArray.forEach(li => {
    console.log(li.textContent);
});
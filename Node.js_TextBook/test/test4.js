const result1 = [0, 1, 2, 3, 4].reduce(
    function (accumulator, currentValue, currentIndex, array) {
        return accumulator + currentValue;
    },
);

console.log(result1);
console.log("===========================");

const result2 = [0, 1, 2, 3, 4].reduce(
    function (accumulator, currentValue, currentIndex, array,) {
        return accumulator + currentValue;
    }, 10);


console.log(result2);
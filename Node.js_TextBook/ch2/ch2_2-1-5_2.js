var candyMachine = {
    status: {
        name: 'node',
        count: 5,
    },
    getCandy: function () {
        this.status.count--;
        return this.status.count;
    },
};

// var getCandy = candyMachine.getCandy;
// var count = candyMachine.status.count;

var { getCandy, status: { count } } = candyMachine;

for (let i = 0; i < 10; i++) {
    //console.log(candyMachine.getCandy());
    getCandy = getCandy.bind(candyMachine,);
    console.log(getCandy());
}

const array = ['node.js', {}, 10, true];
const [node, obj, , bool] = array;

console.log(node, obj, bool);
console.log(typeof node, typeof obj, typeof bool);



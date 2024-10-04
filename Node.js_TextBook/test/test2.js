console.log('aa' || 'human');
console.log('human' || 'human');

var Human = function (type) {
    this.type = type || 'human';
};


const man = new Human('aa');

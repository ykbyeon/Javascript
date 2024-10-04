/**
 * Prototype , Class
 */


var Human = function (type) {
    this.type = type || 'human';
};

Human.isHuman = function (human) {
    return human instanceof Human;
};

Human.prototype.breathe = function () {
    //alert('H-a-a-a-m');
    console.log('H-a-a-a-m');
};

var Zero = function (type, firstName, lastName) {
    Human.apply(this, arguments);
    this.firstName = firstName;
    this.lastName = lastName;
    //console.log(arguments);
};

Zero.prototype = Object.create(Human.prototype);
Zero.prototype.constructor = Zero;  //상속하는 부분
Zero.prototype.sayName = function () {
    //alert(this.firstName + ' ' + this.lastName);
    console.log(this.firstName + ' ' + this.lastName);
};

var oldZero = new Zero('human', 'Zero', 'Cho');
console.log(Human.isHuman(oldZero)); //true
oldZero.sayName();
oldZero.breathe();


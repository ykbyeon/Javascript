class Human {
    consturctor(type) {
        this.type = type || 'human';
    };

    static isHuman = human => human instanceof Human;

    breathe() {
        alert('h-a-a-a-m');
    }
};


class Zero extends Human {
    constructor(type, firstName, lastName) {
        super(type);
        this.firstName = firstName;
        this.lastName = lastName;
    };

    sayName() {
        super.breathe();
        alert(this.firstName + ' ' + this.lastName);
    };
};

const newZero = new Zero('human', 'Zero', 'Cho');
Human.isHuman(newZero);// true
console.log(Human.isHuman(newZero));

//GitHub 테스트 입니다.
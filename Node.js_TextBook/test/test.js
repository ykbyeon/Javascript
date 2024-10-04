var name = "pepper";

var pet = {
    name: "salt",
    printName: function () {
        who(); //`this`값을 판별하는 데에 보아야할 부분은 who()가 실행된 이 부분!!
    }
};

function who() {
    console.log(this.name);
}

pet.printName();     //pepper 

global['name'] = '변영국';
console.log(global);
pet.printName();     //pepper 

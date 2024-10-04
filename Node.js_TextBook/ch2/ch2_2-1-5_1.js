
var relationship1 = {
    name: 'relationship1 name',
    //friends: ['nero', 'hero', 'xero'],
    friends: ['nero',],
    logFriends: function () {
        const name = 'logFriends name';
        console.log('- 2 -----------------------');
        console.log(`name: ${name}`);
        console.log(`this.name: ${this.name}`);
        var that = this // relation1을 가리키는 this를 that에 저장
        console.log('- 3 -----------------------');
        console.log(`this: ${this}`);  //realation1
        console.log(this);
        this.friends.forEach(function (friend) {
            const name = 'InnerFunction name';
            console.log(`name: ${name}`);
            console.log(`this.name: ${this.name}`);
            //console.log(that.name, friend);
            //console.log(this.name, friend);
            console.log('- 4 -----------------------');
            console.log(`this: ${this}`);
            console.log(this);
            console.log('- 5 -----------------------');
            console.log(`that: ${that}`);
            console.log(that);
        });
    },
};


console.log('- 1 -----------------------');
var name = 'Global name';
console.log(this);
console.log(global);
relationship1.logFriends();



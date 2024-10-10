async function findAndSaveUser(Users) {
    try {
        let user = await Users.findOne({});
        user.name = 'zero';
        user = await user.save();
        user = await Users.findOne({ gender: 'm' });
        //생략
    }
    catch (error) {
        console.error(error);
    }
};

const findAndSaveUser_arrow = async (Users) => {
    try {
        let user = await Users.findOne({});
        user.name = 'zero';
        user = await user.save();
        user = await Users.findOne({ gender: 'm' });
        //생략
    }
    catch (error) {
        console.error(error);
    }
};


const promise1 = Promise.resolve('Success1');
const promise2 = Promise.resolve('Success2');

(async () => {
    for await (promise of [promise1, promise2]) {
        console.log(promise);
    }
})();
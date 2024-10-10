function findAndSaveUser(Users) {
    Users.findOne({}, (err, user) => {//첫 번째 콜백
        if (err) {
            return console.error(err);
        }
        user.name = 'zero';
        user.save((err) => {//두 번째 콜백
            if (err) {
                return console.error(err);
            }
            Users.findOne({ gender: 'm' }, (err, user) => {//세 번째 콜백
                // 생략
            });
        });

    });
};

// let A = { gender: 'm', name : 'YK.Byeon'};

// findAndSaveUser();
// findAndSaveUser(A);

function findAndSaveUser_promise(Users) {
    Users.findOne({})
        .then(user => {
            user.name = 'zero';
            user.save();
        })
        .then(user => {
            Users.findOne({ gender: 'm'});
        })
        .then(user => {
            //생략
        })
        .catch(err => console.error(err))
};

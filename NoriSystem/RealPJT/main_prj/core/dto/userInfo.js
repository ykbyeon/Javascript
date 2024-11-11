
const freezeUserInfoMap = new Map();

const addFreezeUserInfo = (userObj) => {
    if ( !userObj )
        return false;
    if ( !userObj.getUserID || !userObj.getUserID() ) {
        return false;
    }

    if ( freezeUserInfoMap.has(userObj.getUserID())) {
        console.log ( "Already exists User .. ");
        return true;
    }
    freezeUserInfoMap.set(userObj.getUserID(), userObj);
};

const getFreezeUserInfo = (id) => {
    if ( hasFreezeUser(id)) {
        const uObj = freezeUserInfoMap.get(id);
        /*
        if ( uObj ) {
            uObj.resetConnectionTimes();
        }
        */
        return uObj;
    }
    return undefined;
};


const hasFreezeUser = (id) => {
    //console.log ('hasFreezeUser :: ' + id );
    if ( !id ) {
        return false;
    }
    return freezeUserInfoMap.has(id);
};

const removeFreezeUserInfo = (id) => {
    if ( hasFreezeUser(id)) {
        return freezeUserInfoMap.delete(id);
    }
    return false;
};

const removeTimeLimitUserInfos = (minutes) => {
    const removeArray = [];
    for ( let uv of freezeUserInfoMap.values() ) {
        if ( uv.getDiffMillis() > minutes*60*1000 ) {
            removeArray.push(uv.getUserID());
        }
    }
    for ( let uID of removeArray ) {
        removeFreezeUserInfo(uID);
    }
};

/**
 * 일종의 Closure Function DTO
 * 변경할 수 없고 해당 데이터만 관리
 * @param {*} id 
 * @param {*} pwd 
 * @returns 
 */
const FreezingUserInfo = (id,pwd) => {
    let userID = id;
    let userPwd = pwd;
    let userName = undefined;
    let userRole = undefined;
    const createTime = new Date();
    let lastConnectionTime = new Date();
    const getUserID = () => {
        return userID;
    };
    const getUserPwd = () => {
        return userPwd;
    };
    const getUserName = () => {
        return userName;
    };
    const setUserName = (uName) => {
        userName = uName;
    };
    const setUserID = (id) => {
        userID = id;
    };
    const setUserPwd = (pwd) => {
        userPwd = pwd;
    };

    const getUserRole = () => {
        return userRole;
    };
    const setUserRole = (role) => {
        userRole = role;
    };

    const getCreateTime = () => {
        return createTime;
    };
    const getDiffMillis = () => {
        return (new Date()).getTime() - lastConnectionTime.getTime();
    };
    const resetConnectionTimes = () => {
        lastConnectionTime = new Date();
    }; 
    return Object.freeze({
        getUserID, getUserPwd, setUserPwd, setUserID, getUserName, setUserName
        , getCreateTime, getDiffMillis, resetConnectionTimes
        , getUserRole, setUserRole
    });
};


export default {
    FreezingUserInfo, addFreezeUserInfo, getFreezeUserInfo, hasFreezeUser
    , removeTimeLimitUserInfos, removeFreezeUserInfo
}

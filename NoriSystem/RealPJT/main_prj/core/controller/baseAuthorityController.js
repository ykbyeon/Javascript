import jwtFn from "#core/utils/jwtFn.js";
import userInfo from "#core/dto/userInfo.js";
import common from "#core/utils/common.js";


const checkUserAuthorization = async ( userID ) => {
    let userDto;
    if ( userInfo.hasFreezeUser(userID) ) {
        userDto = userInfo.getFreezeUserInfo(userID);
//        console.log ( userID, " userDto is exists ... ");
    } else {
        userDto = userInfo.FreezingUserInfo(userID, 'pwd');
        //  db search value .. 
        userDto.setUserName("임시");
        userDto.setUserRole(1);
        userInfo.addFreezeUserInfo(userDto);
//        console.log ( userID, " userDto is not exists ... ");        
    }
    return userDto;
}

const registUserAuthorization = async ( params ) => {
    const userID = params.id;
    const userPWD = params.password;
    // check ID PWD ROLE 

    let userDto;
    if ( userInfo.hasFreezeUser(userID) ) {
        userDto = userInfo.getFreezeUserInfo(userID);
    } else {
        userDto = userInfo.FreezingUserInfo(userID, userPWD);
        //  db search value .. 
        userDto.setUserName("임시");
        userDto.setUserRole(1);
        userInfo.addFreezeUserInfo(userDto);
    }
    return userDto;
}

const removeUserAuthoization = async ( params ) => {
    let userID = params.id;
    if ( !userID ) {
        userID = params.userID;
    }
    let userDto;
    if ( userInfo.hasFreezeUser(userID) ) {
        userDto = userInfo.getFreezeUserInfo(userID);
        let flag = userInfo.removeFreezeUserInfo(userID);

        if ( flag ) {
            return common.makeCommonJsonResult(userDto, 0);
        } else {
            return common.makeCommonJsonResult(userDto, 1);
        }
    } else {
        return common.makeCommonJsonResult('', 1, '삭제할 사용자 정보가 존재하지 않습니다.');
    }
}


const registAuthorization = async (res, params) => {
    const result = await jwtFn.makeAuthorityHttpCookies(res, params);
    const status = ( result === true ) ? 0 : -1;
    const fResult = common.makeCommonJsonResult(result,status);
    return fResult;
}

export default {
    registAuthorization, checkUserAuthorization, registUserAuthorization, removeUserAuthoization
};
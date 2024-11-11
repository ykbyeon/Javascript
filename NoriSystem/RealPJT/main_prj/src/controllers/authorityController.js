import jwtFn from "#core/utils/jwtFn.js";
import userInfo from "#core/dto/userInfo.js";
import common from "#core/utils/common.js";

const registAuthorization = async (res, params) => {
    const result = await jwtFn.makeAuthorityHttpCookies(res, params);
    const status = ( result === true ) ? 0 : -1;
    const fResult = common.makeCommonJsonResult(result,status);
    return fResult;
}

export default {
    registAuthorization
};
import jwt from "jsonwebtoken";

const defaultJwtOptions = {
    expiresIn: '1h' 
};


const getSecretKey =  () => {
    const secretKey = process.env.J_KEY || "DEFAULT_KEYS";
    //console.log ( `JWT UTIL - ${secretKey}`);
    return secretKey;    
};

const makeTokenValue = async ( data, opt ) => {
    if ( opt ) {
        opt = Object.assign( opt, defaultJwtOptions);
    } else {
        opt = defaultJwtOptions;
    }
    const token = jwt.sign( data, getSecretKey(), opt );
    return token;
}

const verifyTokenValue = async ( token ) => {
    const result = {
        status : -1, 
        value : undefined
    };
    try {
        const decodeValue = jwt.verify(token, getSecretKey());
        result.status = 0;
        result.value = decodeValue;
    } catch ( e ) {
        result.value = e;
    }
    return result;
}

const makeAuthorityHttpCookies = async (res,data) => {
    const token = await makeTokenValue(data);
    const tokenName = (process.env.MAIN_COOKIE_KEY || "DEF");
    const authTokens = tokenName+"="+token;
    res.cookie(tokenName, token, {
        httpOnly:true
    });
    res.setHeader("task_auth_tokens", authTokens);
    return {'status':true, authTokens};
}

const getAuthorityFromHttpCookies = async( req ) => {
    let cookies = req.headers.cookie;
    if ( !cookies ) {
        cookies = req.headers.exec_authorization;
    }
    if ( !cookies ) {
        cookies = req.headers.task_auth_tokens;
    }
    if ( !cookies ) {
        return {
            status: -1, 
            value : "Not Found"
        };
    }
    const cookieArr = cookies.split(";");
    let authCookie = undefined;
    for ( let cook of  cookieArr ) {
        let arr = cook.split("=");
        if ( arr[0].trim() === (process.env.MAIN_COOKIE_KEY || "DEF")) {
            authCookie = arr[1].trim();
        }
    }
    if ( authCookie ) {
        return await verifyTokenValue(authCookie);
    }
    return {
        status: -1, 
        value : "Not Found"
    };
}

export default {
    getSecretKey, makeTokenValue, verifyTokenValue, getAuthorityFromHttpCookies, makeAuthorityHttpCookies
};

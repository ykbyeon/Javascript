import jwt from "jsonwebtoken";

const defaultJwtOptions = {
    expiresIn: '1h' 
};

const testTokenValue = async () => {
    let decodeValue = undefined;
    const value = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoia2tzIiwicHdkIjoiMTExMSIsInRlc3RCbG9jayI6ImdnZyIsImFyciI6WzEsMiwzXSwic3ViX2FyciI6eyJhIjoiYSIsImIiOiJiIn0sImlhdCI6MTcyNzE2MjYwMSwiZXhwIjoxNzI3MTY2MjAxfQ.xZti_FiCYPCRx9n-krqkDG6FNx4TPqUtVak_p_Ivk6E";
    const value2 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoia2tzIiwicHdkIjoiMTExMSIsInRlc3RCbG9jayI6ImdnZyIsImFyciI6WzEsMiwzXSwic3ViX2FyciI6eyJhIjoiYSIsImIiOiJiIn0sImlhdCI6MTcyNzIxODI1NiwiZXhwIjoxNzI3MjIxODU2fQ.MEzGjxsWsC32FSnmuGmlXlevvzQ7N6R7fy57U5aqlCA";
    const value3 = "abcdefg";   //dummy value
    /*
    try {
        decodeValue = jwt.verify(value, getSecretKey());
        console.log ( decodeValue );
        return decodeValue;
    } catch ( e ) {
        console.log ( " ERROR CATCHED .....  ");
        console.error ( e );
        return e;
    }
    */
    return await verifyTokenValue(value);
}

const testMakeTokenValue = async () => {
    const userInfos = {
        user: 'kks', 
        pwd: '1111', 
        testBlock : 'ggg', 
        arr : [1, 2, 3],
        sub_arr : {
            a : 'a', b: 'b'
        }
    };
    return await makeTokenValue(userInfos);
};

const getSecretKey =  () => {
    const secretKey = process.env.J_KEY || "DEFAULT_KEYS";
    //console.log ( `JWT UTIL - ${secretKey}`);
    return secretKey;    
};

const makeTokenValue = async ( data, opt ) => {
    if ( opt ) {
        opt = Object.assign(opt, defaultJwtOptions);
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
    res.cookie(tokenName, token, {
        httpOnly:true
    });
    return true;
}

const getAuthorityFromHttpCookies = async( req ) => {
    const cookies = req.headers.cookie;
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

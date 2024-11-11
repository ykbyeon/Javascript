import dotenv from "dotenv";

import path from "node:path";
import fs from "node:fs/promises";
import common from "./common.js";
import cryptoFn from "./cryptoFn.js";

const envs = dotenv.config();

const initConfigValue = {
    cryptoMap:undefined,
    mainDBMap:undefined,
    mainDB:process.env.MAIN_DATABASE
};

const initializeConfig = async (fileDir) => {
    if ( !fileDir ) {
        fileDir = path.resolve();
    }
    const curDir = path.join( fileDir, "/core/configs/");
    
    const cfgMainFile = path.join(curDir, "/.env");

    const envDefMap = new Map();
    initConfigValue.cryptoMap = envDefMap;

    try {
        await fs.access(cfgMainFile, fs.constants.F_OK);
        const envBuf        = await fs.readFile(cfgMainFile);
        const envFullData   = envBuf.toString();

        const mainArr = envFullData.split(/\r?\n/);
        for ( let cv of mainArr ) {
            cv = cv.trim();
            if ( !cv )
                continue;
            let cArr = cv.split(/=/);
            envDefMap.set(cArr[0], cArr[1]);
        }
        if ( envDefMap.has("M_KEY") && envDefMap.has("I_KEY") ) {
            const siteCryptor = cryptoFn.CryptoAes256Fn(envDefMap.get("M_KEY"),envDefMap.get("I_KEY"));
            envDefMap.set("SITE_CRYPTOR", siteCryptor);
            envDefMap.set("IS_NEW",false);
        }
    } catch ( error ) {
        //  file 이 없음 생성 후 테스트
        const mainKey   = common.makeUniqueKeyByRandom(32);
        const ivKey     = common.makeUniqueKeyByRandom(16);
        const jwtKey    = common.makeUniqueKeyByRandom(32);
        const str =
`
M_KEY=${mainKey}
I_KEY=${ivKey}
J_KEY=${jwtKey}
`;        
        try {
            await fs.writeFile(cfgMainFile, str);
            envDefMap.set("M_KEY", mainKey);
            envDefMap.set("I_KEY", ivKey);
            envDefMap.set("J_KEY", jwtKey);
            console.log ( envDefMap.keys(), envDefMap.get("M_KEY"), envDefMap.get("I_KEY") );
            const siteCryptor = cryptoFn.CryptoAes256Fn(envDefMap.get("M_KEY"),envDefMap.get("I_KEY"));
            envDefMap.set("SITE_CRYPTOR", siteCryptor);
            envDefMap.set("IS_NEW",true);
        } catch ( err ) {
            console.log(err);
        }
    }
    return envDefMap;
};

const encryptRelativeEnvFile = async (orgFullPath, relEnvPath, cryptoObj ) => {
    const databaseConfigs = new Map();
    initConfigValue.mainDBMap = databaseConfigs;
    if ( !relEnvPath ) {
        relEnvPath = process.env.MAIN_DATABASE; 
    }
    if ( relEnvPath && !orgFullPath ) {
        orgFullPath = path.join(path.resolve(), `../.${relEnvPath}_env`);
    }

    if ( !cryptoObj ) {
        cryptoObj = initConfigValue.cryptoMap.get("SITE_CRYPTOR");
    }

    const refConfFile = path.join(path.resolve(), `/core/configs/.${relEnvPath}_env`);
    try {
        await fs.access(orgFullPath, fs.constants.F_OK);
        const envBuf        = await fs.readFile(orgFullPath);
        const envFullData   = envBuf.toString();

        const mainArr = envFullData.split(/\r?\n/);
        let wContents = "";
        for ( let cv of mainArr ) {
            cv = cv.trim();
            if ( !cv )
                continue;
            let cArr = cv.split(/=/);
            //console.log ( cArr.length , cArr[0], cArr[1]);
            let tv = cryptoObj.encryptHexValue(cArr[1]);
            //console.log ( cArr.length , cArr[0], cArr[1], tv );
            const sv = `${cArr[0]}=${tv}\n`;
            databaseConfigs.set(cArr[0], cArr[1]);
            wContents += sv;
        }
        await fs.writeFile(refConfFile, wContents);
        return databaseConfigs;
    } catch ( error ) {
        console.log("원본 파일을 확인할 수 없습니다.");
        console.log (`파일위치 : ${orgFullPath}`);
        //throw error;
        console.log( error );
    }
    return databaseConfigs;
}

const decryptRelativeEnvFile = async (relEnvPath, cryptoObj ) => {
    const databaseConfigs = new Map();
    initConfigValue.mainDBMap = databaseConfigs;
    if ( !relEnvPath ) {
        relEnvPath = process.env.MAIN_DATABASE; 
    }
    if ( !cryptoObj ) {
        cryptoObj = initConfigValue.cryptoMap.get("SITE_CRYPTOR");
    }
    const refConfFile = path.join(path.resolve(), `/core/configs/.${relEnvPath}_env`);
    try {
        await fs.access(refConfFile, fs.constants.F_OK);
        const envBuf        = await fs.readFile(refConfFile);
        const envFullData   = envBuf.toString();

        const mainArr = envFullData.split(/\r?\n/);
        for ( let cv of mainArr ) {
            cv = cv.trim();
            if ( !cv )
                continue;
            let cArr = cv.split(/=/);
            //console.log ( cArr.length , cArr[0], cArr[1]);
            let tv = cryptoObj.decryptHexValue(cArr[1]);
//            console.log ( cArr.length , cArr[0], cArr[1], tv );
            databaseConfigs.set(cArr[0], tv);
        }
        return databaseConfigs;
    } catch ( error ) {
        console.log("원본 파일을 확인할 수 없습니다.");
        console.log (`파일위치 : ${refConfFile}`);
        //throw error;
        console.log( error );
    }
    return databaseConfigs;
}

const initializeConfigPost = async (fileDir) => {
    let result ;
    if ( !initConfigValue.cryptoMap || !initConfigValue.cryptoMap.has("IS_NEW") ) {
        return result;
    }
    if ( initConfigValue.cryptoMap.get("IS_NEW") ) {
        result = await encryptRelativeEnvFile();
    } else {
        result = await decryptRelativeEnvFile();
    }
    if ( !fileDir ) {
        fileDir = path.resolve();
    }
    dotenv.config({'path':[`${fileDir}/core/configs/.env`]});
    if ( result ) {
        for ( let k of result.keys() ) {
            if ( k === 'DB_PORT' || k === 'DB_CONN_LIMIT') {
                process.env[k] = parseInt(result.get(k));
            } else {
                process.env[k] = result.get(k);
            }
        }
    }
    return result;
}

export default {
    initializeConfig, encryptRelativeEnvFile, decryptRelativeEnvFile, initializeConfigPost
}
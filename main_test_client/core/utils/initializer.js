import dotenv from "dotenv";

const initializeConfigPost = async () => {
    let result;
    /*
    if ( !initConfigValue.cryptoMap || !initConfigValue.cryptoMap.has("IS_NEW") ) {
        return result;
    }
    
    if ( initConfigValue.cryptoMap.get("IS_NEW") ) {
        result = await encryptRelativeEnvFile();
    } else {
        result = await decryptRelativeEnvFile();
    }
    */

    dotenv.config({ 'path': ['.env', './core/configs/.env', './core/configs/.main_db_env'] });
    if (result) {
        for (let k of result.keys()) {
            if (k === 'DB_PORT' || k === 'DB_CONN_LIMIT') {
                process.env[k] = parseInt(result.get(k));
            } else {
                process.env[k] = result.get(k);
            }
        }
    }
    return result;
}

export default {
    initializeConfigPost
}
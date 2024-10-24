import {loadDynamicModuleByName} from '#core/utils/common.js';

let mainDB = undefined;

const getMainDatabase = async () => {
    if ( mainDB ) {
        return mainDB;
    }
    const mainDatabase = `#core/dao/${process.env.MAIN_DATABASE}.js`;
    console.log ( mainDatabase );
    mainDB = await loadDynamicModuleByName(mainDatabase);
    return mainDB;
};

const graceShutdownPool = async () => {
    const mainDatabase = await getMainDatabase();
    await mainDatabase.graceShutdownPool();
}

export const loadConventionalBusinessQuery = async (businessSqlJs) => {
    const sqlJsName = `#sqls/${process.env.MAIN_DATABASE}/${businessSqlJs}`;
    return await loadDynamicModuleByName(sqlJsName);
}

export const getConnection = async () => {
    if ( mainDB ) {
        return await mainDB.getPooledConnection();
    }
}

export const releaseConnection = async (conn) => {
    if ( mainDB ) {
        return await mainDB.releasePooledConnection(conn);
    }
}

export const getTrxConnection = async () => {
    if ( mainDB ) {
        return await mainDB.getPooledTrxConnection();
    }
}

export const releaseTrxConnection = async (conn) => {
    if ( mainDB ) {
        return await mainDB.releasePooledTrxConnection(conn);
    }
}

export const getMainDB = async () => {
    return await getMainDatabase();
}

export const initializeConventinalValues = async (businessSqlJs) => {
    const mainDB = await getMainDatabase();
    const businessSQL = await loadConventionalBusinessQuery(businessSqlJs);
    return {mainDB, businessSQL};
}

export default {
    getMainDatabase, graceShutdownPool, loadConventionalBusinessQuery, initializeConventinalValues
}
import {loadDynamicModuleByName} from "#core/utils/common.js";

const InitDAO = ( mainDB, mainSQL ) => {
    let init    = false;
    const _mainDB = mainDB;
    const _mainSQL = mainSQL;

    if ( _mainDB && _mainSQL ) {
        init = true;
    }

    const getDB = () => {
        return _mainDB;
    }
    const getSQL = () => {
        return _mainSQL;
    }
    const isInitialized = () => {
        if ( !init ) {
            if ( _mainDB && _mainSQL ) {
                init = true;
            }
        }
        return init;
    }
    return Object.freeze({
        getDB, getSQL, isInitialized
    });
} 

export const initializeDAOValues = ( mainDB, mainSQL ) => {
    return InitDAO(mainDB, mainSQL);
}
/*
export const initializeConventinalDAO = ( mainObj ) => {
    return InitDAO ( mainObj.mainDB, mainObj.businessSQL );
}
*/    

export const loadConventionalBusinessQuery = async (businessSqlJs) => {
    const sqlJsName = `#sqls/${process.env.MAIN_DATABASE}/${businessSqlJs}`;
    return await loadDynamicModuleByName(sqlJsName);
}


export default {
    initializeDAOValues, loadConventionalBusinessQuery
};
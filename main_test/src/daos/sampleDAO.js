import baseDAO from '#core/dao/baseDAO.js';


let mainDB;
let mainSQL;

let isInitialized = false;


const initResource = async (mDB) => {
    mainDB = mDB;
    mainSQL = await baseDAO.loadConventionalBusinessQuery("sampleSQL.js");
    if ( mainDB && mainSQL ) {
        isInitialized = true;
    } else {
        isInitialized = false;
    }

    //console.log ( mainDB, mainSQL );
}


export const getVersion = () => {
    console.log("Sample DAO -- PRINT CONSOLE");
    return "SAMPLE DAO VERSION : 0.01";
}

const getTestValue = async (conn, params) => {
    if ( !isInitialized ) {
        throw new Error( "Database Resources are not initializied ...");
    }
    const query = mainSQL.getQueryByID("SELECT_ODIS_TEST_MST_JOIN_DTL_ALL");
    try {
        const result = await mainDB.selectQuery(conn, query, params);
        return result;
    } catch ( e ) {
        console.log(e);
        throw e;
    } 
}

const getTestDynamicInValues = async (conn, params) => {
    if ( !isInitialized ) {
        throw new Error( "Database Resources are not initializied ...");
    }
    const partialName = "@IN_PARAMS@";
    const query = mainSQL.getDynamicQueryById("SELECT_ODIS_TEST_MST_JOIN_DTL_IN_SQL", params, partialName);
    //console.log ( params );
    try {
        const result = await mainDB.selectQuery(conn, query, params);
        return result;
    } catch ( e ) {
        console.log(e);
        throw e;
    } 
}

const SELECT_ODIS_TEST_MST_JOIN_DTL = async(conn, params) => {
    if ( !isInitialized ) {
        throw new Error( "Database Resources are not initializied ...");
    }
    const query = mainSQL.getQueryByID("SELECT_ODIS_TEST_MST_JOIN_DTL");
    try {
        const result = await mainDB.selectQuery(conn, query, params);
        return result;
    } catch ( e ) {
        console.log(e);
        throw e;
    } 
};

const INSERT_ODIS_TEST_MST = async (conn, params) => {
    if ( !isInitialized ) {
        throw new Error( "Database Resources are not initializied ...");
    }
    const query = mainSQL.getQueryByID("INSERT_ODIS_TEST_MST");
    try {
        const result = await mainDB.insertQuery(conn, query, params);
        return result;
    } catch ( e ) {
        console.log(e);
        throw e;
    } 
};

const INSERT_ODIS_TEST_DTL = async (conn, params) => {
    if ( !isInitialized ) {
        throw new Error( "Database Resources are not initializied ...");
    }
    const query = mainSQL.getQueryByID("INSERT_ODIS_TEST_DTL");
    try {
        const result = await mainDB.insertQuery(conn, query, params);
        return result;
    } catch ( e ) {
        console.log(e);
        throw e;
    } 
};

const SELECT_ODIS_TEST_MST_JOIN_DTL_BY_ID = async(conn, params) => {
    if ( !isInitialized ) {
        throw new Error( "Database Resources are not initializied ...");
    }
    const query = mainSQL.getQueryByID("SELECT_ODIS_TEST_MST_JOIN_DTL_BY_ID");
    try {
        const result = await mainDB.selectQuery(conn, query, params);
        return result;
    } catch ( e ) {
        console.log(e);
        throw e;
    } 
};


export default {
    getVersion,  getTestValue, initResource , getTestDynamicInValues, SELECT_ODIS_TEST_MST_JOIN_DTL, 
    INSERT_ODIS_TEST_DTL, INSERT_ODIS_TEST_MST, SELECT_ODIS_TEST_MST_JOIN_DTL_BY_ID
};
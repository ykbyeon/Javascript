import baseDAO from '#core/dao/baseDAO.js';


let mainDB;
let mainSQL;

let isInitialized = false;


const initResource = async (mDB) => {
    mainDB = mDB;
    mainSQL = await baseDAO.loadConventionalBusinessQuery("mainTaskSQL.js");
    if ( mainDB && mainSQL ) {
        isInitialized = true;
    } else {
        isInitialized = false;
    }

    //console.log ( mainDB, mainSQL );
}

export const getVersion = () => {
    console.log("TASK DAO -- PRINT CONSOLE");
    return "TASK DAO VERSION : 0.01";
};


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

const INSERT_DTB_REQ_JOB_MST_FOR_INIT = async (conn, params) => {
    if ( !isInitialized ) {
        throw new Error( "Database Resources are not initializied ...");
    }
    const query = mainSQL.getQueryByID("INSERT_DTB_REQ_JOB_MST_FOR_INIT");
    try {
        const result = await mainDB.insertQuery(conn, query, params);
        return result;
    } catch ( e ) {
        console.log(e);
        throw e;
    } 
}

const UPDATE_DTB_REQ_JOB_MST = async (conn, params) => {
    if ( !isInitialized ) {
        throw new Error( "Database Resources are not initializied ...");
    }
    const query = mainSQL.getQueryByID("UPDATE_DTB_REQ_JOB_MST");
    try {
        const result = await mainDB.insertQuery(conn, query, params);
        return result;
    } catch ( e ) {
        console.log(e);
        throw e;
    } 
}

const INSERT_DTB_REQ_TASK_GROUP_STATUS_FOR_INIT = async (conn, params) => {
    if ( !isInitialized ) {
        throw new Error( "Database Resources are not initializied ...");
    }
    const query = mainSQL.getQueryByID("INSERT_DTB_REQ_TASK_GROUP_STATUS_FOR_INIT");
    try {
        let result;
        if ( params && params.length && Array.isArray(params[0]) ) {
            result = await mainDB.modifyBatch(conn, query, params);
        } else {
            result = await mainDB.insertQuery(conn, query, params);
        }
        return result;
    } catch ( e ) {
        console.log(e);
        throw e;
    } 
}

const UPDATE_DTB_REQ_TASK_GROUP_STATUS = async (conn, params) => {
    if ( !isInitialized ) {
        throw new Error( "Database Resources are not initializied ...");
    }
    const query = mainSQL.getQueryByID("UPDATE_DTB_REQ_TASK_GROUP_STATUS");
    try {
        const result = await mainDB.insertQuery(conn, query, params);
        return result;
    } catch ( e ) {
        console.log(e);
        throw e;
    } 
}


const INSERT_DTB_REQ_TASK_DTL_FOR_INIT = async (conn, params) => {
    if ( !isInitialized ) {
        throw new Error( "Database Resources are not initializied ...");
    }
    const query = mainSQL.getQueryByID("INSERT_DTB_REQ_TASK_DTL_FOR_INIT");
    try {
        let result;
        if ( params && params.length && Array.isArray(params[0]) ) {
            result = await mainDB.modifyBatch(conn, query, params);
        } else {
            result = await mainDB.insertQuery(conn, query, params);
        }
        return result;
    } catch ( e ) {
        console.log(e);
        throw e;
    } 
};

const UPDATE_DTB_REQ_TASK_DTL_FOR_RESULT = async (conn, params) => {
    if ( !isInitialized ) {
        throw new Error( "Database Resources are not initializied ...");
    }
    const query = mainSQL.getQueryByID("UPDATE_DTB_REQ_TASK_DTL_FOR_RESULT");
    try {
        //console.log ( query, params);
        const result = await mainDB.updateQuery(conn, query, params);
        return result;
    } catch ( e ) {
        console.log(e);
        throw e;
    } 
};

const MODIFY_DTB_REQ_TASK_STATUS = async (conn, params) => {
    if ( !isInitialized ) {
        throw new Error( "Database Resources are not initializied ...");
    }
    const query = mainSQL.getQueryByID("MODIFY_DTB_REQ_TASK_STATUS");
    try {
        //console.log ( query, params);
        const result = await mainDB.insertQuery(conn, query, params);
        return result;
    } catch ( e ) {
        console.log(e);
        throw e;
    } 
}


const SELECT_JOB_TASK_GTOUP_INFOS_BY_JOBID = async (conn, params) => {
    if ( !isInitialized ) {
        throw new Error( "Database Resources are not initializied ...");
    }
    const query = mainSQL.getQueryByID("SELECT_JOB_TASK_GTOUP_INFOS_BY_JOBID");
    try {
        //console.log ( query, params);
        const result = await mainDB.insertQuery(conn, query, params);
        return result;
    } catch ( e ) {
        console.log(e);
        throw e;
    } 
}

const SELECT_DTB_REQ_JOB_MST_JOIN_DETAILS = async ( conn, params ) => {
    if ( !isInitialized ) {
        throw new Error( "Database Resources are not initializied ...");
    }
    const query = mainSQL.getQueryByID("SELECT_DTB_REQ_JOB_MST_JOIN_DETAILS");
    try {
        //console.log ( query, params);
        const result = await mainDB.insertQuery(conn, query, params);
        return result;
    } catch ( e ) {
        console.log(e);
        throw e;
    } 
}


export default {
    getVersion, initResource, INSERT_DTB_REQ_TASK_DTL_FOR_INIT, UPDATE_DTB_REQ_TASK_DTL_FOR_RESULT, MODIFY_DTB_REQ_TASK_STATUS, 
    SELECT_JOB_TASK_GTOUP_INFOS_BY_JOBID, INSERT_DTB_REQ_JOB_MST_FOR_INIT, UPDATE_DTB_REQ_JOB_MST, 
    INSERT_DTB_REQ_TASK_GROUP_STATUS_FOR_INIT, UPDATE_DTB_REQ_TASK_GROUP_STATUS, SELECT_DTB_REQ_JOB_MST_JOIN_DETAILS
}

import { getConnection, releaseConnection, getMainDB, getTrxConnection, releaseTrxConnection } from "#core/service/baseDbService.js";

import mainDao from "#core/dao/mainTaskDAO.js";

const initResource = async () => {
    const mainDB = await getMainDB();
    await mainDao.initResource(mainDB);
}

await initResource();

const initializeRequestTaskJobValues = async( params = {} ) => {
    let conn;
    let result;
    try {
        conn = await getTrxConnection();
        const jobParams = params.jobParams;
        const taskGroupParams = params.taskGroupParams;
        const taskParams = params.taskParams;

        await mainDao.INSERT_DTB_REQ_JOB_MST_FOR_INIT(conn, jobParams );
        await mainDao.INSERT_DTB_REQ_TASK_GROUP_STATUS_FOR_INIT(conn, taskGroupParams);
        await mainDao.INSERT_DTB_REQ_TASK_DTL_FOR_INIT( conn, taskParams);


        await conn.commit();
    } catch ( e ) {
        await conn.rollback();
        throw e;
    } finally {
        await conn.rollback();
        await releaseTrxConnection(conn);
    }
    return result;
}

const insertRequestTaskDetailInitValues = async(params) => {
    let conn;
    let result;
    try {
        conn = await getConnection();
        result = await mainDao.INSERT_DTB_REQ_TASK_DTL_FOR_INIT(conn, params);
    } catch ( e ) {
        throw e;
    } finally {
        await releaseConnection(conn);
    }
    return result;
}

const modifyRequestTaskDetailResultValues = async (params) => {
    let conn;
    let result;
    try {
        conn = await getConnection();
        result = await mainDao.UPDATE_DTB_REQ_TASK_DTL_FOR_RESULT(conn, params);
    } catch ( e ) {
        throw e;
    } finally {
        await releaseConnection(conn);
    }
    return result;
}

const modifyRequestTaskStatusValues = async (params) => {
    let conn;
    let result;
    try {
        conn = await getConnection();
        result = await mainDao.MODIFY_DTB_REQ_TASK_STATUS(conn, params);
    } catch ( e ) {
        throw e;
    } finally {
        await releaseConnection(conn);
    }
    return result;
}

const modifyRequestTaskGroupStatusValues = async (params) => {
    let conn;
    let result;
    try {
        conn = await getConnection();
        result = await mainDao.UPDATE_DTB_REQ_TASK_GROUP_STATUS(conn, params);
    } catch ( e ) {
        throw e;
    } finally {
        await releaseConnection(conn);
    }
    return result;
}

const modifyRequestTaskJobStatusValues = async (params) => {
    let conn;
    let result;
    try {
        conn = await getConnection();
        result = await mainDao.UPDATE_DTB_REQ_JOB_MST(conn, params);
    } catch ( e ) {
        throw e;
    } finally {
        await releaseConnection(conn);
    }
    return result;
}


const getRequestTaskJobInitInfos = async (params) => {
    let conn;
    let result;
    try {
        conn = await getConnection();
        result = await mainDao.SELECT_JOB_TASK_GTOUP_INFOS_BY_JOBID(conn, params);
    } catch ( e ) {
        throw e;
    } finally {
        await releaseConnection(conn);
    }
    return result;
}

const getRequestTaskJobStatusResultInfos = async (params) => {
    //console.log ( "Param ....  : ", params );
    let conn;
    let result;
    try {
        conn = await getConnection();
        result = await mainDao.SELECT_DTB_REQ_JOB_MST_JOIN_DETAILS(conn, params);
    } catch ( e ) {
        throw e;
    } finally {
        await releaseConnection(conn);
    }
    return result;
}


export default {
    initResource, getMainDB, insertRequestTaskDetailInitValues, modifyRequestTaskDetailResultValues, modifyRequestTaskStatusValues, getRequestTaskJobInitInfos,
    initializeRequestTaskJobValues, modifyRequestTaskJobStatusValues, modifyRequestTaskGroupStatusValues, getRequestTaskJobStatusResultInfos
};


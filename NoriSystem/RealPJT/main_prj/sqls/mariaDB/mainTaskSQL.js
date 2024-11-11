import sqlFn from "#core/utils/sqlFn.js";

const getVersion = () => {
    return "Sample Version is 0.0001";
}

const queryMap = new Map();

queryMap.set('INSERT_DTB_REQ_TASK_DTL_FOR_INIT', 
    `
    INSERT INTO DTB_REQ_TASK_DTL (REQUEST_ID, REQ_GROUP_ID, REQ_TASK_ID, TASK_UNIT_ID, TASK_FN_ARGS, TASK_STATUS, CREATE_DATE) 
    VALUES (?, ?, ?, ?, ?, ?, now())     
    `
);

queryMap.set('UPDATE_DTB_REQ_TASK_DTL_FOR_RESULT', 
    `
    UPDATE DTB_REQ_TASK_DTL 
    SET     TASK_STATUS=?
            , TASK_SUB_STATUS = ?
            , TASK_STATUS_MESSAGE = ?
            , TASK_RESULT = ? 
            , FINISHED_DATE = now()
    WHERE REQUEST_ID =? AND REQ_GROUP_ID = ? AND REQ_TASK_ID=?
    `
);

queryMap.set('MODIFY_DTB_REQ_TASK_STATUS', 
    `
    INSERT INTO DTB_REQ_TASK_STATUS (
        REQUEST_ID, 
        REQ_GROUP_ID, 
        REQ_TASK_ID,
        TASK_STATUS, 
        TASK_ANALYSIS, 
        MODIFY_ID, 
        MODIFY_DATE
    ) VALUES (
        ?, ?, ?, ?, ?, 'SYSTEM', now()  
    )
    ON DUPLICATE KEY UPDATE 
        TASK_STATUS=?,
        TASK_ANALYSIS=?, 
        MODIFY_DATE=now()
    `
);

queryMap.set('SELECT_JOB_TASK_GTOUP_INFOS_BY_JOBID', 
    `
    SELECT	MAIN.*, B.TASK_GROUP_ID, B.TASK_GROUP_ORDER , C.TASK_GROUP_NAME, C.TASK_GROUP_KIND, D.TASK_UNIT_ID, D.TASK_ID, D.TASK_ORDER , E.TASK_NAME, E.TASK_ID_KIND
    FROM	(
        SELECT *
        FROM	DTB_JOB_MST a
        WHERE JOB_ID=?
    ) MAIN INNER JOIN DTB_JOB_ORDER_DTL B
    ON MAIN.JOB_ID=B.JOB_ID
    INNER JOIN DTB_TASK_GROUP_MST C 
    ON B.TASK_GROUP_ID=C.TASK_GROUP_ID
    INNER JOIN DTB_TASK_GROUP_DTL D
    ON C.TASK_GROUP_ID=D.TASK_GROUP_ID 
    INNER JOIN dtb_task_mst E
    ON D.TASK_ID=E.TASK_ID
    ORDER BY B.TASK_GROUP_ORDER ASC, D.TASK_ORDER ASC     
    `
);

queryMap.set('INSERT_DTB_REQ_TASK_GROUP_STATUS_FOR_INIT', 
    `
    INSERT INTO DTB_REQ_TASK_GROUP_STATUS (
        REQUEST_ID, 
        REQ_GROUP_ID,
        TASK_GROUP_ID, 
        TASK_GROUP_STATUS, 
        REQ_GROUP_ORDER,
        CREATE_DATE, 
        MODIFY_DATE
    ) VALUES (
        ?,
        ?,
        ?,
        -1,
        ?,
        NOW(),
        NOW()
    )
    `
);

queryMap.set('UPDATE_DTB_REQ_TASK_GROUP_STATUS', 
    `
    UPDATE DTB_REQ_TASK_GROUP_STATUS 
    SET TASK_GROUP_STATUS=?
        , MODIFY_DATE=now()
    WHERE REQUEST_ID = ? 
        AND REQ_GROUP_ID = ? 
    `
);

queryMap.set('INSERT_DTB_REQ_JOB_MST_FOR_INIT', 
    `
    INSERT INTO DTB_REQ_JOB_MST (
        REQUEST_ID,
        USER_ID, 
        JOB_ID, 
        JOB_STATUS, 
        REQUEST_TYPE, 
        RESPONSE_URL,
        REQ_ORIGIN_URL, 
        CREATE_ID,
        CREATE_DATE,
        MODIFY_ID,
        MODIFY_DATE
    ) VALUES (
        ?,
        ?,
        ?,
        -1,
        1,
        ?,
        ?,
        ?,
        NOW(),
        ?,
        NOW()
    )
    `
);
  
queryMap.set('UPDATE_DTB_REQ_JOB_MST', 
    `
    UPDATE DTB_REQ_JOB_MST 
    SET JOB_STATUS=?
        , MODIFY_DATE=now()
    WHERE REQUEST_ID=? 
    `
);

queryMap.set("SELECT_DTB_REQ_JOB_MST_JOIN_DETAILS", 
    `
    SELECT	MAIN.*, B.REQ_GROUP_ID, B.TASK_GROUP_ID, B.TASK_GROUP_STATUS, B.REQ_GROUP_ORDER, B.MODIFY_DATE AS GROUP_MODIFY_DATE
        , C.REQ_TASK_ID, C.TASK_UNIT_ID, C.TASK_STATUS, C.TASK_SUB_STATUS, C.TASK_RESULT AS TASK_EXEC_RESULT,  C.FINISHED_DATE 
        , D.TASK_STATUS AS MONITOR_TASK_STATUS, D.TASK_ANALYSIS, D.MODIFY_DATE AS MONITOR_MODIFY_DATE
    FROM	(
        SELECT	A.*
        FROM	dtb_req_job_mst A
        WHERE	REQUEST_ID=?
    ) MAIN
    INNER JOIN dtb_req_task_group_status B
    ON MAIN.REQUEST_ID=B.REQUEST_ID
    INNER JOIN dtb_req_task_dtl C
    ON B.REQUEST_ID=C.REQUEST_ID AND  B.REQ_GROUP_ID=C.REQ_GROUP_ID 
    LEFT OUTER JOIN dtb_req_task_status D
    ON C.REQUEST_ID=D.REQUEST_ID AND C.REQ_GROUP_ID=D.REQ_GROUP_ID AND C.REQ_TASK_ID = D.REQ_TASK_ID
    ORDER BY REQ_GROUP_ORDER, C.FINISHED_DATE

    `
)
  

const getQueryByID = (queryID) => {

    if ( queryMap.has(queryID) ) {
        return queryMap.get(queryID);
    }
    return undefined;
};

const getDynamicQueryById = (queryID, params, replaceName) => {
    if ( queryMap.has(queryID) ) {
        let result = queryMap.get(queryID);
        if ( params && replaceName ) {
            const partialSQL = sqlFn.makeParmeterSQL(params);
            result = sqlFn.makeTranslateDynamicSQL(result, replaceName, partialSQL);
        }
        //console.log ( "Full Query : " , result );
        return result;
    }
};

const getDynamicQueryByIdParams = (queryID, jsonParamValues) => {
    if ( queryMap.has(queryID) ) {
        let result = queryMap.get(queryID);
        if ( jsonParamValues && (typeof jsonParamValues) === 'object' ) {
            const transJson = {};
            for ( let v of Object.keys(jsonParamValues)) {
                let partialSQL = sqlFn.makeParmeterSQL( jsonParamValues[v]);
                transJson[v] = partialSQL;
            }
            result = sqlFn.makeTranslateDynamicSQLValues(result, transJson);
        }
        //console.log ( "Full Query : " , result );
        return result;
    }
};


const getDynamicQueryByIdValues = (queryID, jsonParamValues) => {
    if ( queryMap.has(queryID) ) {
        let result = queryMap.get(queryID);
        if ( jsonParamValues && (typeof jsonParamValues) === 'object' ) {
            result = sqlFn.makeTranslateDynamicSQLValues(result, jsonParamValues);
        }
        //console.log ( "Full Query : " , result );
        return result;
    }
};

export default {
    getVersion, getQueryByID, getDynamicQueryById, getDynamicQueryByIdValues, getDynamicQueryByIdParams
};

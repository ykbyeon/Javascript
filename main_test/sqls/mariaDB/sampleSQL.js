import sqlFn from "#core/utils/sqlFn.js";

const getVersion = () => {
    return "Sample Version is 0.0001";
}

const queryMap = new Map();

queryMap.set('SELECT_ODIS_TEST_MST_JOIN_DTL', 
    `
    SELECT A.ID, A.TITLE, B.TEST_ID, B.CONTENTS, A.CREATE_DATE, B.CREATE_DATE AS DTL_CREATE_DATE
    FROM ( SELECT * FROM ODIS_TEST_MST WHERE ID LIKE CONCAT('%',?,'%') AND TITLE LIKE CONCAT('%',?,'%')    ) A
    LEFT OUTER JOIN ODIS_TEST_DTL B
    ON A.ID=B.ID
    ORDER BY A.CREATE_DATE DESC, B.CREATE_DATE ASC      
    `
);


queryMap.set('SELECT_ODIS_TEST_MST_JOIN_DTL_ALL', 
    `
    SELECT A.ID, A.TITLE, B.TEST_ID, B.CONTENTS, A.CREATE_DATE, B.CREATE_DATE AS DTL_CREATE_DATE
    FROM ( SELECT * FROM ODIS_TEST_MST WHERE ID LIKE CONCAT('%',?,'%') ) A
    LEFT OUTER JOIN ODIS_TEST_DTL B
    ON A.ID=B.ID
    ORDER BY A.CREATE_DATE DESC, B.CREATE_DATE ASC      
    LIMIT ?    
    `
);

queryMap.set('SELECT_ODIS_TEST_MST_JOIN_DTL_BY_ID', 
    `
    SELECT A.ID, A.TITLE, B.TEST_ID, B.CONTENTS, A.CREATE_DATE, B.CREATE_DATE AS DTL_CREATE_DATE
    FROM (
        SELECT *
        FROM ODIS_TEST_MST sub 
        WHERE sub.ID = ?
    ) A
    LEFT OUTER JOIN ODIS_TEST_DTL B
    ON A.ID=B.ID
    ORDER BY A.CREATE_DATE DESC, B.CREATE_DATE ASC            
    `
);

queryMap.set('SELECT_ODIS_TEST_MST_JOIN_DTL_IN_SQL', 
    `
    SELECT A.ID, A.TITLE, B.TEST_ID, B.CONTENTS, A.CREATE_DATE, B.CREATE_DATE AS DTL_CREATE_DATE
    FROM (
        SELECT *
        FROM ODIS_TEST_MST sub 
        WHERE sub.ID IN (@IN_PARAMS@) 
    ) A
    LEFT OUTER JOIN ODIS_TEST_DTL B
    ON A.ID=B.ID
    ORDER BY A.CREATE_DATE DESC, B.CREATE_DATE ASC            
    `
);



queryMap.set("INSERT_ODIS_TEST_MST", 
    `
    INSERT INTO ODIS_TEST_MST (ID, TITLE, CREATE_DATE) VALUES (?, ?, now())
    `
);

queryMap.set("INSERT_ODIS_TEST_DTL", 
    `
    INSERT INTO ODIS_TEST_DTL (TEST_ID, CONTENTS ,ID, CREATE_DATE) VALUES (?, ?, ?, now())
    `
);




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
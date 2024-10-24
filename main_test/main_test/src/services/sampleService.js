import { getConnection, releaseConnection, getMainDB, getTrxConnection, releaseTrxConnection } from '#core/service/baseDbService.js';
import mainDao from '#daos/sampleDAO.js';
import mainDto from '#dtos/sampleDTO.js'

const initResource = async () => {
    const mainDB = await getMainDB();
    await mainDao.initResource(mainDB);
}

await initResource();

const getTestValue = async (params) => {

    let result;
    let conn;
    try {
        if (!params) {
            params = ['', 10];
        }
        conn = await getConnection();
        result = await mainDao.getTestValue( conn, params);
        await releaseConnection(conn);
    } catch ( err ) {
        console.log ( err );
    } finally {
        await releaseConnection(conn);
    }
    return result;
};

const getTestDynamicInValues = async (params) => {

    let result;
    let conn;
    try {
        conn = await getConnection();
        result = await mainDao.getTestDynamicInValues( conn, params);
        await releaseConnection(conn);
    } catch ( err ) {
        console.log ( err );
    } finally {
        await releaseConnection(conn);
    }
    return result;
};

const getTestParamDTOValues = async (params) => {

    let result = mainDto.makeDefaultValueDTO();
    let conn;
    try {
        conn = await getConnection();
        const arrData = await mainDao.getTestValue(conn, params.simpleData);
        const jsonData = await mainDao.getTestDynamicInValues(conn, params.simpleInData);
        await releaseConnection(conn);
        result.setServiceDataValues(arrData, undefined);
        result.setServiceDataValues(jsonData, "sampleJsonKey");
    } catch ( err ) {
        console.log ( err );
    } finally {
        await releaseConnection(conn);
    }
    return result;
};

const getSampleDataListAll = async (params) => {
    let result;
    let conn;
    let pArr = [];
    if ( params.ID ) {
        pArr.push(params.ID);
    } else {
        pArr.push('');
    }
    if ( params.TITLE) {
        pArr.push(params.TITLE);
    } else {
        pArr.push('')
    }
    try {
        conn = await getConnection();
        result = await mainDao.SELECT_ODIS_TEST_MST_JOIN_DTL( conn, pArr );
        await releaseConnection(conn);
    } catch ( err ) {
        console.log ( err );
    } finally {
        await releaseConnection(conn);
    }
    return result;
}


const modifyODIS_TEST_MST_AND_DTL = async ( params ) => {
    let result = [];
    if ( !params ) {
        return result;
    }

    let masterArray = params.masterArray;
    let dtlArray = params.dtlArray;

    if ( !masterArray || masterArray.length < 2 ) {
        return result;
    }
    if ( !dtlArray || dtlArray.length < 3 ) {
        return result;
    }

    let conn;
    try {
        conn = await getTrxConnection();

        if ( masterArray ) {
            await mainDao.INSERT_ODIS_TEST_MST(conn, masterArray);
        }
        if ( dtlArray ) {
            if ( dtlArray.length <= 2 ) {
                dtlArray.push(masterArray[0]);
            } else {
                dtlArray[2] = masterArray[0];
            }
            await mainDao.INSERT_ODIS_TEST_DTL(conn, dtlArray);
        }
        console.log(`Connection : ${conn}`)
        const result = await mainDao.SELECT_ODIS_TEST_MST_JOIN_DTL_BY_ID(conn, masterArray[0]);
        await conn.commit();
        return result;
    } catch ( e ) {
        console.log ( e );
        if ( conn ) {
            await conn.rollback();
        }
        throw e;
    } finally {
        await releaseTrxConnection(conn);
    }
};

export default {
    getTestValue, initResource, getMainDB, getTestDynamicInValues, getTestParamDTOValues, getSampleDataListAll, 
    modifyODIS_TEST_MST_AND_DTL
};


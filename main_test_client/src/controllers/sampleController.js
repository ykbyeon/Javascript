// 2024.11.07 main_test프로그램의 sampleController.js 파일내용을 기준으로, 필요한 항목들만 추려냄. yk.byeon
import common from "#core/utils/common.js";
//import sampleService from "#services/sampleService.js";


/* const sampleCtrlDTOTest = async (jsonParams) => {
    let resultDTO ;
    let serviceStatus = -1;
    try { 
        resultDTO = await sampleService.getTestParamDTOValues(jsonParams);
        serviceStatus = 0;
    } catch ( e ) {
        serviceStatus = -1;
        console.log ( e );
    }
    const data = resultDTO.isDTO() ? resultDTO.makeResultValue() : resultDTO ;
    //const data = resultDTO;
    return common.makeCommonJsonResult(data, serviceStatus);
} */


const getSampleDataListAll = async(params) => {
    let sampleData ;
    let serviceStatus = -1;
    try { 
        sampleData = await sampleService.getSampleDataListAll(params);
        serviceStatus = 0;
    } catch ( e ) {
        serviceStatus = -1;
        console.log ( e );
    }
    const data = {
        'sampleData' : sampleData
    }
    return common.makeCommonJsonResult(data, serviceStatus);
}

/* const modifySampleMasterDetailValues = async(params) => {
    let sampleData ;
    let serviceStatus = -1;
    if ( params && params.masterArray && params.dtlArray ) {
        if ( params.masterArray[0] === '' ) {
            const id = common.makeUniqueKeyByTimeRandom(32, 'MST_');
            params.masterArray[0] = id;
            if ( params.dtlArray.length == 2 ) {
                params.dtlArray.push(id);
            } else if ( params.dtlArray.length == 3 ) {
                params.dtlArray[2] = id;
            }
        }
        if ( params.dtlArray[0] == '' ) {
            const dtlID = common.makeUniqueKeyByTimeRandom(32, 'DTL_');
            params.dtlArray[0] = dtlID;
        }
        params = common.transXssStringValue(params);
    }
    try { 
        sampleData = await sampleService.modifyODIS_TEST_MST_AND_DTL(params);
        serviceStatus = 0;
    } catch ( e ) {
        serviceStatus = -1;
        console.log ( e );
        sampleData = e;
    }
    const data = {
        'sampleData' : sampleData
    }
    return common.makeCommonJsonResult(data, serviceStatus);
} */


/* const closeResource = async () => {
    //  원칙은 application 이 종료할 때 해당 프로세스가 호출되어야 하지만, 
    //  테스트 단계에서 이 코드를 사용함 .. 
    //  실제 서비스 에서는 해당 코드는 사용하지 않을 예정임 ...
    const db = await sampleService.getMainDB();   
    await db.graceShutdownPool();
} */

export default {
    // sampleCtrlTest, 
    // closeResource, 
    // sampleCtrlDTOTest, 
    getSampleDataListAll, 
    // modifySampleMasterDetailValues
};
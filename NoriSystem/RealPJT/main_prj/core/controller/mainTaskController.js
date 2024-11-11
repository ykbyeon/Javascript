import common from "#core/utils/common.js";
import taskFn from "#core/utils/taskFn.js";
import taskInfo from "#core/dto/taskInfo.js";



import mainService from "#core/service/mainTaskService.js";

const currentExecutionMap = new Map();


const requestUnitTaskCommands = async ( params ) => {
    let return_flag = false;
    if ( params['return_flag'] ) {
        return_flag = params['return_flag'];
    }

    //  check 기본 변수 구성되어 있는지?
    if ( !params['mode'] || !params['cmds'] ) {
        return common.makeCommonJsonResult(-1, "필수 항목이 구성되어 있지 않습니다.");
    }

    const jobSystemID = ['DEF_SIMPLE_SINGLE_EXEC_JOB'];

    let jobInfos = await mainService.getRequestTaskJobInitInfos(jobSystemID);
    if ( jobInfos.length == 1 ) {
        jobInfos = jobInfos[0];
    }
    console.dir ( jobInfos );


    //  3개의 Function 에도 Function ID 를 부여한 상태 ...  
    const executionConfigs = taskInfo.makeExecutionConfigValues(1, taskFn.execProcessByConfigs, params, undefined );
    const analysisConfigs = taskInfo.makeAnalysisConfigValues(1, taskFn.executeByPassAnalysisFn, {}, undefined);
    const monitoringConfigs = taskInfo.makeMonitoringConfigValues(1, taskFn.executeByPassMonitoringFn, {}
            , 1000, 10000, true);


    //  정해진 값 혹은 DB 조회 
    const requestID = common.makeUniqueKeyByTimeRandom(32, "REQ_");
    const jobID = jobInfos['JOB_ID'];
    const taskGroupID = jobInfos["TASK_GROUP_ID"];
    const taskUnitID = jobInfos["TASK_UNIT_ID"];

    const initParams = {
        jobParams:[],
        taskGroupParams : [],
        taskParams: [],
    };
    let jobParams = [];
    let taskGroupParams = [];
    let taskParams = [];

    const userID = 'SYSTEM';
    const resUrl = '';

    let reqOriginUrl = params['reqOriginUrl'];
    if ( !reqOriginUrl ) {
        reqOriginUrl = '';
    }

    
    jobParams.push(requestID); 
    jobParams.push(userID); 
    jobParams.push(jobID);
    jobParams.push(resUrl);
    jobParams.push(reqOriginUrl);    
    jobParams.push(userID); 
    jobParams.push(userID);

    taskGroupParams.push(requestID);
    taskGroupParams.push(taskGroupID);
    taskGroupParams.push(taskGroupID);        
    taskGroupParams.push(1);        
    
    taskParams.push(requestID);
    taskParams.push(taskGroupID);
    taskParams.push(taskUnitID);
    taskParams.push(taskUnitID);        
    taskParams.push ( JSON.stringify(params));
    taskParams.push (-1);

    initParams['jobParams'] = jobParams;
    initParams['taskGroupParams'] = taskGroupParams;
    initParams['taskParams'] = taskParams;

    let rv = await mainService.initializeRequestTaskJobValues(initParams);
    console.log ( `RESULT ::: ${rv}`);

    const taskResult = await taskFn.execProcessByConfigs( params );
    console.dir ( taskResult );
        
    await requestUnitTaskCallbackResult(taskUnitID, taskResult.status, taskResult, requestID, taskGroupID );
    await requestGroupTaskCallbackResult(taskGroupID, taskResult.status, requestID);
    await requestUnitTaskMonitoringCallbackResult( taskUnitID,  taskResult.status,  taskResult, requestID, taskGroupID );
    await requestJobTaskCallbackResult(jobID, taskGroupID, taskResult.status, requestID);

    taskResult['REQ_ID'] = requestID;
    return taskResult;
}


const requestSimpleCommands = async ( params ) => {
    //  should have cmds, args , mode 

    //  check 기본 변수 구성되어 있는지?
    if ( !params['mode'] || !params['cmds'] ) {
        return common.makeCommonJsonResult(-1, "필수 항목이 구성되어 있지 않습니다.");
    }

    const jobSystemID = ['DEF_SIMPLE_SINGLE_TASK_JOB'];

    let jobInfos = await mainService.getRequestTaskJobInitInfos(jobSystemID);
    if ( jobInfos.length == 1 ) {
        jobInfos = jobInfos[0];
    }
    //console.dir ( jobInfos );


    //  실행 환경 구성 
    //  1. default execution
    //  2. default analysis
    //  3. default monitoring
    //  4. 1 개의 TaskVO 구성
    //  5. 1 개의 JobVO 구성


    //  3개의 Function 에도 Function ID 를 부여한 상태 ...  
    const executionConfigs = taskInfo.makeExecutionConfigValues(1, taskFn.execProcessByConfigs, params, undefined );
    const analysisConfigs = taskInfo.makeAnalysisConfigValues(1, taskFn.executeByPassAnalysisFn, {}, undefined);
    const monitoringConfigs = taskInfo.makeMonitoringConfigValues(1, taskFn.executeByPassMonitoringFn, {}
            , 1000, 10000, true);


    //  정해진 값 혹은 DB 조회 
    const requestID = common.makeUniqueKeyByTimeRandom(32, "REQ_");
    const jobID = jobInfos['JOB_ID'];
    const taskGroupID = jobInfos["TASK_GROUP_ID"];
    const taskUnitID = jobInfos["TASK_UNIT_ID"];

    const jobVO = taskInfo.JobTaskVO(jobID, [] );
    jobVO.setCallbackFunction(requestJobTaskCallbackResult);
    jobVO.setRequestID(requestID);
    //taskVO.requestMonitoring();


    //  정해진 값 혹은 DB 조회             
    const taskVO = taskInfo.MonitorTaskVO(taskGroupID, [], 10);      
    taskVO.setCallbackFunction(requestGroupTaskCallbackResult); 
    taskVO.setRequestID(requestID);


    //  정해진 값 혹은 DB 조회
    const taskDTO = taskInfo.MonitorTaskDTO(taskUnitID, executionConfigs, analysisConfigs, monitoringConfigs, {}, requestUnitTaskMonitoringCallbackResult);
    taskDTO.setCallbackExecutionResultFn( requestUnitTaskCallbackResult );
    taskVO.appendTaskMap(taskDTO);
    taskDTO.setParentObj(taskVO);
    jobVO.appendTaskVO(taskVO);
    taskVO.setParentObj(jobVO);
    taskDTO.setRequestID(requestID);


    const initParams = {
        jobParams:[],
        taskGroupParams : [],
        taskParams: [],
    };
    let jobParams = [];
    let taskGroupParams = [];
    let taskParams = [];

    const userID = 'SYSTEM';
    const resUrl = '';
    let reqOriginUrl = params['reqOriginUrl'];
    if ( !reqOriginUrl ) {
        reqOriginUrl = '';
    }
    
    jobParams.push(requestID); 
    jobParams.push(userID); 
    jobParams.push(jobID);
    jobParams.push(resUrl);
    jobParams.push(reqOriginUrl);
    jobParams.push(userID); 
    jobParams.push(userID);

    taskGroupParams.push(requestID);
    taskGroupParams.push(taskGroupID);
    taskGroupParams.push(taskGroupID);        
    taskGroupParams.push(1);        
    
    taskParams.push(requestID);
    taskParams.push(taskGroupID);
    taskParams.push(taskUnitID);
    taskParams.push(taskUnitID);        
    taskParams.push ( JSON.stringify(params));
    taskParams.push (-1);

    initParams['jobParams'] = jobParams;
    initParams['taskGroupParams'] = taskGroupParams;
    initParams['taskParams'] = taskParams;

    let rv = await mainService.initializeRequestTaskJobValues(initParams);
    //console.log ( `RESULT ::: ${rv}`);
    //console.log ( `RESULT ::: ${rv}`);

    //  수행 내용 Database 구성
    jobVO.requestMonitoring();

    const result = common.makeCommonJsonResult(requestID, 0);
    result['REQ_ID'] = requestID;
    return result;
}

const requestDynamicDefaultUserCommands = async ( params ) => {

    //  1. check params has array or just json ? 
    if ( !params ) {
        return common.makeCommonJsonResult(-1, "필수 항목이 구성되어 있지 않습니다.");
    }
    const isMultiParams = Array.isArray(params);
    if ( isMultiParams ) {
        if ( params.length === 1 && Array.isArray( params[0]) ) {
            params = params[0];
        }
    }
    const isMultiGroupParams = Array.isArray(params[0]) ? true : false;

    const jobSystemID = ['DEF_SIMPLE_MULTI_TASK_JOB'];

    //  2. check 필수 항목 확인 
    if ( isMultiParams ) {
        jobSystemID[0] = 'DEF_SIMPLE_MULTI_TASK_JOB';
        if ( isMultiGroupParams ) {
            for ( let arr of params ) {
                for ( let v of arr ) {
                    if ( !v['mode'] || !v['cmds'] ) {
                        return common.makeCommonJsonResult(-1, "필수 항목이 구성되어 있지 않습니다.");            
                    }
                }
            }
        }
    } else {
        jobSystemID[0] = 'DEF_SIMPLE_SINGLE_TASK_JOB';
        //  check 기본 변수 구성되어 있는지?
        if ( !params['mode'] || !params['cmds'] ) {
            return common.makeCommonJsonResult(-1, "필수 항목이 구성되어 있지 않습니다.");
        }
    }

    let jobInfos = await mainService.getRequestTaskJobInitInfos(jobSystemID);
    if ( jobInfos.length == 1 ) {
        jobInfos = jobInfos[0];
    }
    console.dir ( jobInfos );

   //  정해진 값 혹은 DB 조회 
    const requestID = common.makeUniqueKeyByTimeRandom(32, "REQ_");
    const jobID = jobInfos['JOB_ID'];

    const analysisConfigs = taskInfo.makeAnalysisConfigValues(1, taskFn.executeByPassAnalysisFn, {}, undefined);
    const monitoringConfigs = taskInfo.makeMonitoringConfigValues(1, taskFn.executeByPassMonitoringFn, {}
            , 1000, 10000, true);

    const jobVO = taskInfo.JobTaskVO(jobID, [] );
    jobVO.setCallbackFunction(requestJobTaskCallbackResult);
    jobVO.setRequestID(requestID);

    const initParams = {
        jobParams:[],
        taskGroupParams : [],
        taskParams: [],
    };
    let jobParams = [];
    let taskGroupParams = [];
    let taskParams = [];

    const userID = 'SYSTEM';
    const resUrl = '';

    let reqOriginUrl = params['reqOriginUrl'];
    if ( !reqOriginUrl ) {
        reqOriginUrl = '';
    }


    jobParams.push(requestID); 
    jobParams.push(userID); 
    jobParams.push(jobID);
    jobParams.push(resUrl);
    jobParams.push(reqOriginUrl);    
    jobParams.push(userID); 
    jobParams.push(userID);

    if ( !isMultiParams ) {
        const taskGroupID = jobInfos["TASK_GROUP_ID"];
        const taskUnitID = jobInfos["TASK_UNIT_ID"];
        //  3개의 Function 에도 Function ID 를 부여한 상태 ...  
        const initConfigs = makeExecutableConfigsValues( params );
        //const executionConfigs = taskInfo.makeExecutionConfigValues(1, taskFn.execProcessByConfigs, params, undefined );
            //  정해진 값 혹은 DB 조회             
        const taskVO = taskInfo.MonitorTaskVO(taskGroupID, [], 10);      
        taskVO.setCallbackFunction(requestGroupTaskCallbackResult); 
        taskVO.setRequestID(requestID);

        //  정해진 값 혹은 DB 조회
        const taskDTO = taskInfo.MonitorTaskDTO(taskUnitID, initConfigs.eCfg, initConfigs.aCfg, initConfigs.mCfg, {}, requestUnitTaskMonitoringCallbackResult);
        taskDTO.setCallbackExecutionResultFn( requestUnitTaskCallbackResult );
        taskVO.appendTaskMap(taskDTO);
        taskDTO.setParentObj(taskVO);
        jobVO.appendTaskVO(taskVO);
        taskVO.setParentObj(jobVO);
        taskDTO.setRequestID(requestID);

        taskGroupParams.push(requestID);
        taskGroupParams.push(taskGroupID);
        taskGroupParams.push(taskGroupID);        
        taskGroupParams.push(1);        
        
        taskParams.push(requestID);
        taskParams.push(taskGroupID);
        taskParams.push(taskUnitID);
        taskParams.push(taskUnitID);        
        taskParams.push ( JSON.stringify(params));
        taskParams.push (-1);
    } else if ( isMultiGroupParams ) {
        const taskGroupID = jobInfos["TASK_GROUP_ID"];
        const taskUnitID = jobInfos["TASK_UNIT_ID"];
        let groupIndex = 1;
        for ( let grp of params ) {
            const tempGroupID = common.makeUniqueKeyByTimeRandom(36, "TGP_TMP_");
            let taskGroups = [];
            taskGroups.push(requestID);
            taskGroups.push(tempGroupID);
            taskGroups.push(taskGroupID);        
            taskGroups.push(groupIndex++);        
    
            taskGroupParams.push(taskGroups);

                //  정해진 값 혹은 DB 조회             
            const taskVO = taskInfo.MonitorTaskVO(tempGroupID, [], 10);      
            taskVO.setCallbackFunction(requestGroupTaskCallbackResult); 
            taskVO.setRequestID(requestID);

            for ( let v of grp ) {
                const initConfigs = makeExecutableConfigsValues( v );
                const tempTaskID = common.makeUniqueKeyByTimeRandom(36, "TSK_TMP_");
                const taskDTO = taskInfo.MonitorTaskDTO(tempTaskID, initConfigs.eCfg, initConfigs.aCfg, initConfigs.mCfg,{}, requestUnitTaskMonitoringCallbackResult);
                taskDTO.setCallbackExecutionResultFn( requestUnitTaskCallbackResult );
                taskVO.appendTaskMap(taskDTO);
                taskDTO.setParentObj(taskVO);
                let tasks = [];
                tasks.push(requestID);
                tasks.push(tempGroupID);
                tasks.push(tempTaskID);
                tasks.push(taskUnitID);                
                tasks.push ( JSON.stringify(v));
                tasks.push (-1);
                taskParams.push(tasks);
                taskDTO.setRequestID(requestID);
            }
            taskVO.setParentObj(jobVO);
            jobVO.appendTaskVO(taskVO);
        }
        //  정해진 값 혹은 DB 조회
    } else {    //  multi param ... 
        const taskGroupID = jobInfos["TASK_GROUP_ID"];
        const taskUnitID = jobInfos["TASK_UNIT_ID"];
        //  3개의 Function 에도 Function ID 를 부여한 상태 ...  
        taskGroupParams.push(requestID);
        taskGroupParams.push(taskGroupID);
        taskGroupParams.push(taskGroupID);        
        taskGroupParams.push(1);        

            //  정해진 값 혹은 DB 조회             
        const taskVO = taskInfo.MonitorTaskVO(taskGroupID, [], 10);      
        taskVO.setCallbackFunction(requestGroupTaskCallbackResult); 
        taskVO.setRequestID(requestID);

        for ( let v of params ) {
            const initConfigs = makeExecutableConfigsValues( v );
            const tempTaskID = common.makeUniqueKeyByTimeRandom(36, "TSK_TMP_");
            const taskDTO = taskInfo.MonitorTaskDTO(tempTaskID, initConfigs.eCfg, initConfigs.aCfg, initConfigs.mCfg, {}, requestUnitTaskMonitoringCallbackResult);
            taskDTO.setCallbackExecutionResultFn( requestUnitTaskCallbackResult );
            taskVO.appendTaskMap(taskDTO);
            taskDTO.setParentObj(taskVO);
            let tasks = [];
            tasks.push(requestID);
            tasks.push(taskGroupID);
            tasks.push(tempTaskID);            
            tasks.push(taskUnitID);
            tasks.push ( JSON.stringify(v));
            tasks.push (-1);
            taskParams.push(tasks);
            taskDTO.setRequestID(requestID);            
        }
        //  정해진 값 혹은 DB 조회
        jobVO.appendTaskVO(taskVO);
        taskVO.setParentObj(jobVO);
    }

    initParams['jobParams'] = jobParams;
    initParams['taskGroupParams'] = taskGroupParams;
    initParams['taskParams'] = taskParams;

    let rv = await mainService.initializeRequestTaskJobValues(initParams);
    console.log ( `RESULT ::: ${rv}`);
    console.log ( `RESULT ::: ${rv}`);

    //  수행 내용 Database 구성
    jobVO.requestMonitoring();

    const result = common.makeCommonJsonResult(requestID, 0);
    result['REQ_ID'] = requestID;
    return result;
}

const makeExecutableConfigsValues = ( orgParams ) => {
    if ( !orgParams ) {
        return undefined;
    }
    let executionConfigs = taskInfo.makeExecutionConfigValues(1, taskFn.execProcessByConfigs, orgParams, orgParams.result );
    let analysisConfigs ;
    let monitoringConfigs;
    if ( orgParams['analysisParams']) {
        const aParams = orgParams['analysisParams'];
        if ( aParams['fnMode'] ) {
            if ( aParams['fnMode'] === 'file') {
                analysisConfigs = taskInfo.makeAnalysisConfigValues(1, taskFn.executeByConfigFileAnalysisFn, aParams['args'], aParams['result']);
            } else {
                //  정해지지 않으면 bypass 
                analysisConfigs = taskInfo.makeAnalysisConfigValues(1, taskFn.executeByPassAnalysisFn, {}, undefined);
            }
        } else {
            analysisConfigs = taskInfo.makeAnalysisConfigValues(1, taskFn.executeByPassAnalysisFn, {}, undefined);
        }
    } else {
        analysisConfigs = taskInfo.makeAnalysisConfigValues(1, taskFn.executeByPassAnalysisFn, {}, undefined);
    }

    if ( orgParams['monitorParams']) {
        const mParams = orgParams['monitorParams'];
        if ( mParams['fnMode'] ) {
            if ( mParams['fnMode'] === 'file') {
                monitoringConfigs = taskInfo.makeMonitoringConfigValues(1, taskFn.executeFileExistsMonitoringFn, mParams['args'], 
                    mParams['monitorTimeMillis'], mParams['maxLimitTimeMillis'], true);
            } else {
                //  정해지지 않으면 bypass 
                monitoringConfigs = taskInfo.makeMonitoringConfigValues(1, taskFn.executeByPassMonitoringFn, {}
                    , 1000, 10000, true);
            }
        } else {
            monitoringConfigs = taskInfo.makeMonitoringConfigValues(1, taskFn.executeByPassMonitoringFn, {}
                , 1000, 10000, true);
        }
    } else {
        monitoringConfigs = taskInfo.makeMonitoringConfigValues(1, taskFn.executeByPassMonitoringFn, {}
            , 1000, 10000, true);        
    }
    return {
        eCfg : executionConfigs, 
        aCfg : analysisConfigs, 
        mCfg : monitoringConfigs
    };
}

const requestJobTaskCurrentStatusResultValues = async ( params ) => {
    const currentStatusResult = await mainService.getRequestTaskJobStatusResultInfos( params );
    //console.log ( currentStatusResult );
    return common.makeCommonJsonResult(currentStatusResult, 0);
}


const requestUnitTaskCallbackResult = async( taskID,  taskStatus,  analysisResult, requestID, groupID ) => {
    // check taskStatus

    //  save task status result to DB ( or Files )

    console.log (`requestUnitTaskCallbackResult ::: ${taskID} ${taskStatus} - ${analysisResult} ===>> ${requestID}` );

    const dataValues = [];
    dataValues.push (analysisResult.status);
    dataValues.push (analysisResult.subStatus);
    dataValues.push( analysisResult.message );
    dataValues.push (analysisResult.data);

    dataValues.push(requestID);
    dataValues.push(groupID);
    dataValues.push(taskID);

    await mainService.modifyRequestTaskDetailResultValues(dataValues);

    //  JOB 이 일괄로 RETURN 하는 경우 Group Return 없음
    //  리턴 받을 곳이 있다면 return ( 대부분 rest api ) => 요청 시점에 등록된 rest call url 로 호출 .. 
};

const requestUnitTaskMonitoringCallbackResult = async( taskID,  taskStatus,  analysisResult, requestID, groupID ) => {
    // check taskStatus

    //  save task status result to DB ( or Files )
    //console.log (`requestUnitTaskMonitoringCallbackResult ::: ${taskID} ${taskStatus} - ${analysisResult} ===>> ${requestID}, Group : ${groupID}` );
    console.log (`requestUnitTaskMonitoringCallbackResult ::: ${taskID} ${taskStatus} ===>> ${requestID}, Group : ${groupID}` );

    let result = analysisResult;
    if ( result && result.data && result.data.length > 256 ) {
        result = result.data.toString().substring(0, 256);
        //console.log ( result );
    }

    if ( result && result.length > 256 ) {
        result = result.substring(0,256);
        //console.log ( result );
    }

    const dataParams = [];

    dataParams.push(requestID);
    dataParams.push(groupID);
    dataParams.push(taskID);
    dataParams.push(taskStatus);
    dataParams.push(result);
    dataParams.push(taskStatus);
    dataParams.push(result);

    await mainService.modifyRequestTaskStatusValues(dataParams);

/*
    const dataValues = [];
    dataValues.push (analysisResult.status);
    dataValues.push (analysisResult.subStatus);
    dataValues.push( analysisResult.message );
    dataValues.push (analysisResult.data);

    dataValues.push(requestID);
    dataValues.push(groupID);
    dataValues.push(taskID);

    await mainService.modifyRequestTaskDetailResultValues(dataValues);
*/


    //  JOB 이 일괄로 RETURN 하는 경우 Group Return 없음
    //  리턴 받을 곳이 있다면 return ( 대부분 rest api ) => 요청 시점에 등록된 rest call url 로 호출 .. 
};


const requestGroupTaskCallbackResult = async (taskGroupID, taskGroupStatus,requestID) => {
    //  check taskGroupStatus 

    //  Save Task Group Status Result to DB ( or Files )

    console.log (`requestGroupTaskCallbackResult ::: ${taskGroupID} - ${taskGroupStatus} ===>> ${requestID}` );

    const params = [taskGroupStatus, requestID, taskGroupID];
    await mainService.modifyRequestTaskGroupStatusValues(params);

    //  JOB 이 일괄로 RETURN 하는 경우 Group Return 없음
    //  리턴 받을 곳이 있다면 return ( 대부분 rest api ) => 요청 시점에 등록된 REST API CALL url 로 호출 .. 
}

const requestJobTaskCallbackResult = async (jobID, taskGroupID, jobStatus,requestID ) => {
    //  check taskGroupID if taskGroupID === -1 이면 전체 Job Status 구성 ...  

    //  check jobStatus 

    //  Save JOB Status Result to DB ( or Files )


    console.log (`requestJobTaskCallbackResult ::: ${jobID} - ${taskGroupID} - ${jobStatus} ===>> ${requestID}` );
    const params = [jobStatus, requestID];
    await mainService.modifyRequestTaskJobStatusValues(params);

    //  JOB 이 일괄로 RETURN 하는 경우 Group Return 없음
    //  리턴 받을 곳이 있다면 return ( 대부분 rest api ) => 요청 시점에 등록된 rest call url 로 호출 .. 
}

const closeResource = async () => {
    //  원칙은 application 이 종료할 때 해당 프로세스가 호출되어야 하지만, 
    //  테스트 단계에서 이 코드를 사용함 .. 
    //  실제 서비스 에서는 해당 코드는 사용하지 않을 예정임 ...
    const db = await mainService.getMainDB();   
    await db.graceShutdownPool();
}

export default {
    requestSimpleCommands, requestUnitTaskCommands, requestDynamicDefaultUserCommands, 
    requestJobTaskCurrentStatusResultValues, closeResource
}
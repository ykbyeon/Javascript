import taskFn from "#core/utils/taskFn.js";
import taskInfo from "#core/dto/taskInfo.js";
import common from "#core/utils/common.js";
import fs from "node:fs/promises";


import initializer from "#core/utils/initializer.js";

await initializer.initializeConfig();
await initializer.initializeConfigPost();

import mainController from "#core/controller/mainTaskController.js"


const configs = {
    mode: 2, 
    cmds: "cmd.exe", 
    args: ['/c', 'dir', '.'], 
    options : {cwd:'d:\\TEST_PROJECTS\\'} ,
    logInfos: {
        logType: 1, //  1, 2, 4
        fileName : 'touch_01.txt',
        fileDir : ''
    },
    encoding: 'ksc5601',     
    timeLimitMillis: -1
};

const configs02 = {
    mode: 1, 
    cmds: "cmd.exe", 
    args: ['/c', 'dir', '.'], 
    options : {} ,
    logInfos: {
        logType: 0, //  1, 2, 4
        fileName : '',
        fileDir : ''
    },
    encoding: 'ksc5601',     
    timeLimitMillis: -1
};

const configs03 = {
    mode: 1, 
    cmds: "cmd.exe", 
    args: ['/c', 'dir', '.'], 
    options : {cwd:'d:\\data\\'} ,
    logInfos: {
        logType: 0, //  1, 2, 4
        fileName : '',
        fileDir : ''
    },
    encoding: 'ksc5601',     
    timeLimitMillis: -1
};

const configs04 = {
    mode: 1, 
    cmds: "cmd.exe", 
    args: ['/c', 'dir', '.'], 
    options : {cwd:'d:\\TEST_PROJECTS\\'} ,
    logInfos: {
        logType: 0, //  1, 2, 4
        fileName : '',
        fileDir : ''
    },
    encoding: 'ksc5601',     
    timeLimitMillis: -1, 
    analysisParams: { fnMode:'file', args: {fileName:'touch_01.txt', fileDir: 'D:\\TEST_PROJECTS\\'} },
    monitorParams: { fnMode:'file', monitorTimeMillis :5000, maxLimitTimeMillis:20000 }
};


/*
let tResult = await mainController.requestSimpleCommands(configs);
console.log ( '--------------------------------------------');
console.dir( tResult );
console.log ( '--------------------------------------------');
//configs.options = {};
tResult = await mainController.requestUnitTaskCommands(configs02);
console.log ( '--------------------------------------------');

console.dir( tResult );
console.log ( '--------------------------------------------');
*/

const testParams = [[configs,configs02,configs03], [configs04]];
//const testParams = configs04;
let multiParamResult = await mainController.requestDynamicDefaultUserCommands(testParams);
console.log ( "-------------------------------- EXECUTED START [multiParamResult ] ----------------------------------------");
console.log ( multiParamResult);
console.log ( "-------------------------------- EXECUTED END [multiParamResult ] ----------------------------------------");


setTimeout( async () => {
    console.log("END");

    console.log ( "-------------------------------- ALL CLOSING START [multiParamResult ] ----------------------------------------");    
    const finalStatusResult = await mainController.requestJobTaskCurrentStatusResultValues([multiParamResult.REQ_ID]);
    console.dir( finalStatusResult );

    await mainController.closeResource();

    
    console.log ( multiParamResult);
    console.log ( "-------------------------------- ALL CLOSING END [multiParamResult ] ----------------------------------------");

}, 60000);


const arr = ['a','b',222];
const arJoin = arr.join();
const arSplit = arJoin.split(',');
console.log ( arr.join() , arSplit );

/*
const taskResult = await taskFn.execProcessByConfigs( configs );
console.dir ( taskResult );

const executeAnalysisSampleFunction = async (cfg) => {
    //console.log ("Analysis Execution Result - Sample File 존재 유무 테스트 ");
    console.dir(cfg.data);
    console.log ( `EXECUTED PARSED VALUE JUST CALLED : ${(new Date()).toLocaleString()}`);
    return 'abc.txt';
};

const executeMonitoringSampleFunction = async ( v ) => {
    try {
        await fs.access(v, fs.constants.F_OK );
        return {status:taskInfo.TASK_STATUS.DONE, finished:true};
    } catch ( e ) {
        return {status:taskInfo.TASK_STATUS.RUNNING, finished:false};
    }
}

const executeMonitoringDelSampleFunction = async ( v ) => {
    try {
        await fs.access(v, fs.constants.F_OK );
        await fs.unlink(v);
        return {status:taskInfo.TASK_STATUS.DONE, finished:true};
    } catch ( e ) {
        return {status:taskInfo.TASK_STATUS.RUNNING, finished:false};
    }
}


const executionConfigs = taskInfo.makeExecutionConfigValues(1, taskFn.execProcessByConfigs, configs, undefined );
const analysisConfigs = taskInfo.makeAnalysisConfigValues(1, executeAnalysisSampleFunction, {}, undefined);
const monitoringConfigs = taskInfo.makeMonitoringConfigValues(1, executeMonitoringSampleFunction, {}
    , 5000, 36000, true);

const monitoringDefConfigs = taskInfo.makeMonitoringConfigValues(1, executeMonitoringDelSampleFunction, {}
        , 5000, 36000, true);
    

const taskVO = taskInfo.MonitorTaskVO("TASK_GROUP_001", [], 10);
const taskVO02 = taskInfo.MonitorTaskVO("TASK_GROUP_002", [], 10);
const counts    = 100;
    
    
const executeTaskEndCallbackFunctiion = async ( taskID, taskStatus, analysisResult ) => {
    taskVO.setTaskFinished( taskID, taskStatus );
    console.log ( `Callback Function Start ::: [ Task ID : ${taskID} ], [ Status : ${taskStatus} ], [ TaskKeyValue : ${analysisResult} ]`);
};

const executeTaskEndCallbackDelFunctiion = async ( taskID, taskStatus, analysisResult ) => {
    taskVO02.setTaskFinished( taskID, taskStatus );
    console.log ( `Callback Function Start ::: [ Task ID : ${taskID} ], [ Status : ${taskStatus} ], [ TaskKeyValue : ${analysisResult} ]`);
};



for ( let i = 0; i < counts; i++ ) {
    const tID = (i+1);//common.makeUniqueKeyByTimeRandom(32);
    const taskDTO = taskInfo.MonitorTaskDTO(tID, executionConfigs, analysisConfigs, monitoringConfigs, {}, executeTaskEndCallbackFunctiion);
    taskVO.appendTaskMap(taskDTO);
}

for ( let i = 0; i < counts; i++ ) {
    const tID = 'T02_' +(i+1);//common.makeUniqueKeyByTimeRandom(32);
    const taskDTO = taskInfo.MonitorTaskDTO(tID, executionConfigs, analysisConfigs, monitoringDefConfigs, {}, executeTaskEndCallbackDelFunctiion);
    taskVO02.appendTaskMap(taskDTO);
}


const jobVO = taskInfo.JobTaskVO(common.makeUniqueKeyByTimeRandom(), [taskVO,taskVO02] );
jobVO.setCallbackFunction ( async () => {
    setTimeout( () => {
        console.log ( "JOB ALL FINISHED");
        console.log ("STATUS" );
        console.dir ( jobVO.getCurrentTaskStatus() );
        console.log ("DATABASE HANDLING");
        console.log ( "Clear Resource All --------- Finished ... ");
    })
}, 10000);
//taskVO.requestMonitoring();
jobVO.requestMonitoring();
*/
/*
const taskDTO = taskInfo.makeMonitoringDTO( { analysisResult:'bbc.txt', monitorFn: executeMonitoringDelSampleFunction });
console.dir ( taskDTO );
if ( taskDTO.executeMonitoring )
    taskDTO.executeMonitoring();
*/



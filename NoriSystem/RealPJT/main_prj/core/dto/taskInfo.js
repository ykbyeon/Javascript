import common from '#core/utils/common.js';

/**
 * 상태에 대한 Enum 형식의 Javascript
 * @author : created by KKS
 */
export const TASK_STATUS = {
    'NONE' : -1,
    'DONE' : 0, 
    'FAILED' : 1,
    'PENDING' : 2, 
    'READY' : 3, 
    'QUEUED' : 4, 
    'RUNNING' : 5, 
    'TIMEOVER' : 6, 
    'ABORTED' : 9, 
    getStatusName : (valueNum, isLowerCase) => {
        let result = "UNKNOWN";
        Object.keys(TASK_STATUS).some( (key) => {
            const num = TASK_STATUS[key];
            if ( num === valueNum ) {
                result = key;
                return true;
            }
            return false;
        });

        if ( isLowerCase ) {
            return result.toLowerCase();
        } else {
            return result;
        }
    },
    getKeyNames : () => {
        return Object.keys(TASK_STATUS).filter( (k,idx,arr) => {
            return ((typeof TASK_STATUS[k]) === "number" );
        });
    }
}

Object.freeze(TASK_STATUS);



const makeMonitoringDTO = ( params = {} ) => {
    let requestID = params.requestID;
    let taskID = params.taskID;
    if ( !taskID ) {
        taskID = common.makeUniqueKeyByTimeRandom(32);
    }
    let execCfg = {};
    let analysisCfg = {};
    let monitorCfg = {};
    let abortCfg = {};
    let callbackFn;
    if ( params.execCfg ) {
        execCfg = params.execCfg;
    } else if ( params.execFn ) {
        let eFnType = params.execFnType ;
        let eArgs = {};
        if ( !eFnType ) {
            eFnType = 1;
        }
        if ( params.analysisArgs) {
            eArgs = params.analysisArgs;
        }
        execCfg = makeExecutionConfigValues(eFnType, params.execFn, eArgs, params.execResult);
    } else if ( params.execResult ) {
        execCfg = makeExecutionConfigValues(-1, undefined, {}, params.execResult);
    }

    if ( params.anslysisCfg ) {
        analysisCfg = params.anslysisCfg;
    } else if ( params.analysisFn ) {
        let aFnType = params.analysisFnType ;
        let aArgs = {};
        if ( !aFnType ) {
            aFnType = 1;
        }
        if ( params.analysisArgs) {
            aArgs = params.analysisArgs;
        }
        makeAnalysisConfigValues(aFnType, params.analysisFn, aArgs, params.analysisResult);
    } else if ( params.analysisResult )  {
        analysisCfg = makeAnalysisConfigValues(-1, undefined, undefined, params.analysisResult);
    }

    if ( params.monitorCfg ) {
        monitorCfg = params.monitorCfg;
    } else if ( params.monitorFn ) {
        let mFn = params.monitorFn;
        let mFnType = params.minotorFnType;
        if ( !mFnType ) {
            mFnType = 1;
        }
        let mArgs = params.monitorArgs;
        if ( mArgs ) {
            mArgs = {}
        }

        let monitorMillis = params.monitorMillis;
        let monitorMaxMillis = params.monitorMaxMillis; 
        let printLogs   = params.monitorPrintLog;

        monitorCfg = makeMonitoringConfigValues(mFnType, mFn, mArgs, monitorMillis, monitorMaxMillis, printLogs);
        console.dir ( monitorCfg );
    }

    if ( params.abortCfg ) {
        abortCfg = params.abortCfg;
    } else if ( params.abortFn ) {
        let tFn = params.abortFn;
        let tFnType = params.abortFnType;
        if ( !tFnType ) {
            tFnType = -1;
        }
        let tArgs = params.abortArgs;
        if ( tArgs ) {
            tArgs = {}
        }
        //  나머진 default
        abortCfg = makeAbortConfigValues(tFnType, tFn, tArgs);
    }
    if ( params.callbackFn ) {
        callbackFn = params.callbackFn;
    } else {
        callbackFn = makeCallbackSampleFunction;
    }

    //return [taskID, execCfg, analysisCfg, monitorCfg, abortCfg, callbackFn];
    return MonitorTaskDTO(taskID, execCfg, analysisCfg, monitorCfg, abortCfg, callbackFn);
};


/**
 * EDA 툴처럼 실행 요청 후 Montiroting 을 위한 단위 TASK 
 * 
 * status :    -1 none,   0:done, 1:failed, 2: pending, 3: ready, 4: queued, 5: running, 6 : timeover,  9:aborted
 * @author : created by KKS
 * 
 * @param {*} taskID : task ID ( Task Unique 식별자)
 * @param {*} execFnCfg : {fnType:(await 1 ), fn : function, args: {}, result : {} }
 * @param {*} analysisFnCfg : {fnType:(await 1 ), fn : function, args: {}, result : {} }
 * @param {*} monitorFnCfg : {fnType:(await 1 ), fn : function, args: {}, monitorMills: -1, maxLimitTimeMillis : 24*60*60*1000 } => 24시간
 * @param {*} abortFnCfg : {fnType:(await 1 ), fn : function, args: {} } 
 * @param {*} callbackFn : 종료후 호출할 메소드 ( 무조건 async 모듈 임을 가정 함 )
 * @returns 
 */
const MonitorTaskDTO = (taskID, execFnCfg={}, analysisFnCfg={}, monitorFnCfg={}, abortFnCfg={}, callbackFunction) => {
    let requestID       ;
    const _taskID       = taskID;
    let status          = TASK_STATUS.NONE;
    let timerID         = undefined;
    let finished        = false;
    let analysisResult  = undefined;
    let isPrintLog      = (monitorFnCfg.isPrintLog ? true : false);
    const startDT       = new Date();
    let realStartDT     ;
    let isExecuted      = false;
    let startTimeMills  = startDT.getTime();
    const monitorDefMillis  = 5000;
    const maxDefMillis      = 1*60*60*1000; //  한시간
    let monitorMillis       = monitorFnCfg ? (monitorFnCfg.monitorMillis ? monitorFnCfg.monitorMillis : monitorDefMillis)  : monitorDefMillis;  // def 5 초
    let maxLimitTimeMillis  = monitorFnCfg ? (monitorFnCfg.maxLimitTimeMillis ? monitorFnCfg.maxLimitTimeMillis : maxDefMillis) : maxDefMillis; 
    let callbackFinishedFunction    = callbackFunction;
    let callbackExecutionResultFn;
    let parentObj;


    const setParentObj = (obj) => {
        parentObj = obj;
    };

    const setRequestID = (reqID) => {
        requestID = reqID;
    };


    const getStatus = () => {
        return status;
    };

    const isFinished = () => {
        return finished;
    };

    const getTaskID = () => {
        return _taskID;
    };

    const getStartDate = () => {
        return startDT;
    };

    const getStartDateStr = () => {
        return getDefaultDateString(startDT);
    }

    const setCallbackFunction = (callbackFn) => {
        if ( !callbackFinishedFunction ) {
            callbackFinishedFunction = callbackFn;
            return true;
        } else {
            return false;
        }
    };

    const setCallbackExecutionResultFn = (callbackFn) => {
        if ( !callbackExecutionResultFn ) {
            callbackExecutionResultFn = callbackFn;
            return true;
        }
        return false;
    }

    const executeMainTask = async () => {
        try {
            if ( isPrintLog ) {
                console.log ( `EXECUTE TASK : [ ID : ${taskID} ], [ DATE : ${(new Date()).toLocaleString()}] :: ${JSON.stringify(execFnCfg.args)}`);
            }
            if ( isExecuted ) {
                return;
            }
            isExecuted = true;
            if ( execFnCfg.fn ) {
                if ( execFnCfg.fnType === 1 ) {
                    return await execFnCfg.fn(execFnCfg.args);
                } else {
                    return execFnCfg.fn(execFnCfg.args);
                }
            } else if ( execFnCfg.result ) {
                return execFnCfg.result;
            }
        } catch ( e ) {
            return { status : 1, subStatus:1, message: e, data: e };
        }
    };

    const executeAnalysisResult = async () => {
        const result = await executeMainTask();
        console.dir ( result );

        if ( callbackExecutionResultFn ) {
            let gID;
            if ( parentObj ) {
                gID = parentObj.getTaskGroupID();
            }
            await callbackExecutionResultFn(_taskID, result.status, result, requestID, gID);
        }

        if ( result && result.status != 0 ) {
            finished = true;
            status = TASK_STATUS.FAILED;
            return;
        }

        if ( analysisFnCfg.fn ) {
            if ( analysisFnCfg.fnType === 1 ) {
                analysisResult = await analysisFnCfg.fn(result, analysisFnCfg.args);
            } else {
                analysisResult = analysisFnCfg.fn(result, analysisFnCfg.args);
            }
        } else if ( analysisFnCfg.result ) {
            analysisResult = analysisFnCfg.result;
        }
    }

    const requestMonitoring = () => {
        if ( !realStartDT ) {
            realStartDT = new Date();
            startTimeMills = realStartDT.getTime();
        }
        executeAnalysisResult().then( () => {
            executeMonitoring();
        });
    }

    const releaseResource = async () => {
        let gID;
        if ( parentObj ) {
            gID = parentObj.getTaskGroupID();
        }

        if ( callbackFinishedFunction ) {
            await callbackFinishedFunction(_taskID, getStatus(), analysisResult, requestID, gID );
        }
        if ( parentObj ) {
            parentObj.setTaskFinished( _taskID, getStatus(), analysisResult, requestID, gID );
        }
        if ( timerID ) {
            clearTimeout(timerID);
            timerID = null;
        } else {
            clearImmediate();
        }
    };

    const setanalysisResultValue = (v) => {
        if ( v ) {
            analysisResult = v;
        }
    }

    const getanalysisResultValue = () => {
        return analysisResult;
    }

    const executeMonitoring = () => {
        if ( finished || !monitorFnCfg.fn ) {
            releaseResource().then(() => { console.log ( "END ALL")});
            return;
        }
        if ( !analysisResult ) {
            executeAnalysisResult().then ( () => { console.log ( " Prepared Result " , analysisResult) });
        }
        timerID = setTimeout( async () => {
            if ( isPrintLog ) {
                const dateFormat = "MM.dd HH:mi:ss.SSS";
                console.log ( `MONITORING START ::: [ TaskID : ${_taskID} ] ,  [ START TIME ( CUR_TIME )  : ${common.getDateLocaleString(getStartDate(),dateFormat)} (${common.getDateLocaleString(new Date(), dateFormat)}) ], [ Analysis Value : ${analysisResult} ] `);
            }

            if ( maxLimitTimeMillis != -1 && ( Date.now() - startTimeMills ) >= maxLimitTimeMillis ) {
                status = TASK_STATUS.TIMEOVER;
                finished = true;
                await releaseResource();
                if ( isPrintLog )
                    console.log ( `LIMIT TIME END : [ TASK_ID : ${_taskID} ] `);
                return;
            }

            let mStatus = {'status':TASK_STATUS.RUNNING, 'finished':false};
            if ( monitorFnCfg.fnType === 1 ) {
                mStatus = await monitorFnCfg.fn(analysisResult, monitorFnCfg.args);
            } else {
                mStatus = monitorFnCfg.fn(analysisResult, monitorFnCfg.args);
            }
            //  기존 status 와 다른 status 일 경우 기록 ....  
            if ( status !== mStatus.status ) {
                let gID;
                if ( parentObj ) {
                    gID = parentObj.getTaskGroupID();
                }
                if ( callbackFinishedFunction ) {
                    await callbackFinishedFunction(_taskID, mStatus.status, analysisResult, requestID, gID );
                }
            }

            status = mStatus.status;
            if ( !mStatus.finished ) {
                executeMonitoring();
            } else {
                console.log("Done");
                finished = true;
                await releaseResource();
        
                if ( timerID ) {
                    clearTimeout(timerID);
                    timerID = null;
                } else {
                    clearImmediate();
                }
            }
        }, monitorMillis);
    };

    const requestAbort = async () => {
        if ( isPrintLog ) {
            console.log(`REQUEST ABORT : [ TASK ID : ${_taskID} ] , [ START TIME : ${getStartDateStr()}] , [ CURRENT TIME : ${(new Date()).toLocaleString()}]`);
        }
        if ( !finished ) {
            status = TASK_STATUS.ABORTED;
        } else {
            if ( timerID ) {
                clearTimeout(timerID);
                timerID = null;
            }
            return;
        }
        finished = true;
        if ( abortFnCfg.fn ) {
            if ( abortFnCfg.fnType == 1 ) {
                await abortFnCfg.fn(analysisResult, abortFnCfg.args);
            } else {
                abortFnCfg.fn(analysisResult, abortFnCfg.args);
            }
        }

        await releaseResource();

        if ( timerID ) {
            clearTimeout(timerID);
            timerID = null;
        }
    };

    return Object.freeze({
        requestMonitoring, setanalysisResultValue, getanalysisResultValue, executeMonitoring, getStatus, isFinished, requestAbort, 
        getTaskID , getStartDateStr, setCallbackFunction , setParentObj, setRequestID, setCallbackExecutionResultFn
    });
};

/**
 * Task 들을 관리하기 위한 일종의 함수 Closure 
 * 
 * @author : created by KKS
 * @param {*} tGroupID 
 * @param {*} taskDtoArray 
 * @param {*} execDelayMillis 
 * @param {*} callbackFunction 
 * @returns 
 */
const MonitorTaskVO = (tGroupID, taskDtoArray = [], execDelayMillis = 100, callbackFunction ) => {
    const taskGroupID       = tGroupID;
    const taskMap           = new Map();

    const taskRunningMap    = new Map();
    const taskResultMap     = new Map();

    let requestID;
    let checkedAll          = false;
    let finishedAll         = false;
    let successAllDone      = false;

    let taskVOStatus        = TASK_STATUS.NONE;

    let callbackFinishedFunction  = callbackFunction;
    let parentObj;

    const initResource = () => {
        taskDtoArray.forEach( ( v, k, m) => {
            appendTaskMap(v);
        });
    };

    const setParentObj = (obj) => {
        parentObj = obj;
    };

    const setRequestID = (reqID) => {
        requestID = reqID;
    };

    const getTaskGroupID = () => {
        return taskGroupID;
    };

    const isFinished = () => {
        if ( finishedAll ) 
            return finishedAll;

        let flag = true;
        taskMap.forEach( (v,k,map) => {
            if ( !v.isFinished() ) {
                flag = false;
            };
        });
        if ( flag ) {
            finishedAll = true;
        }
        return finishedAll;
    };

    const isSuccessAllDone = () => {
        if ( checkedAll ) {
            return successAllDone;
        }
        if ( successAllDone ) {
            return successAllDone;
        }
        if ( !isFinished() ) {
            return false;
        }
        if (  taskVOStatus === TASK_STATUS.ABORTED ) {
            return false;
        }
        let flag = true;
        taskMap.forEach ( (v,k,map) => {
            if ( v.getStatus() !== TASK_STATUS.DONE ) {
                flag = false;
            }
        });
        if ( flag ) {
            successAllDone = true;
            taskVOStatus = TASK_STATUS.DONE;
        } else {
            taskVOStatus = TASK_STATUS.FAILED;
        }
        checkedAll = true;
        return successAllDone;
    };

    const getCurrentTaskStatus = () => {
        let arr = TASK_STATUS.getKeyNames();
        const result = new Map();
        arr.forEach( ( v, idx, arr) => {
            result.set(v,0);
        });
        const data = new Map();
        taskMap.forEach( (v, k, map) => {
            let sts = v.getStatus();
            if ( data.has(sts)) {
                let cv = data.get(sts);
                data.set(sts, cv+1);
            } else {
                data.set(sts,1);
            }
        });
        data.forEach( (v,k,map) => {
            result.set (TASK_STATUS.getStatusName(k), v);
        });
        return result;
    };

    const getTaskMap = () => {
        return taskMap;
    };

    const getTaskDTOByID = (taskID) => {
        return taskMap.get(taskID);
    };

    const appendTaskMap     = (taskDTO) => {
        if ( !taskDTO ) {
            return false;
        }
        if ( taskMap.has(taskDTO.getTaskID())  ) {
            return false;
        }
        taskMap.set(taskDTO.getTaskID(), taskDTO);
        return true;
    };

    const removeTaskMapByKey    = ( taskID ) => {
        if ( !taskID ) {
            return false;
        }
        return taskMap.delete(taskID);
    };

    const removeTaskMapByDTO     = (taskDTO) => {
        if ( !taskDTO || !taskDTO.getTaskID ) {
            return false;
        }
        return taskMap.delete(taskDTO.getTaskID());
    };


    const requestMonitoring = () => {
        let timeDelay = execDelayMillis;
        if ( taskVOStatus == TASK_STATUS.NONE ) {
            taskVOStatus = TASK_STATUS.RUNNING;
        } else {
            //  이미 진행 중이거나 진행이 종료된 경우 어떻게 처리할 것인지 ... 
            return;
        }

        taskMap.forEach( (v,k,map) => {
            setTimeout(() => { 
                v.requestMonitoring(); 
                taskRunningMap.set(v.getTaskID(), v.getStatus());
                }, timeDelay);
            timeDelay += execDelayMillis;
        });
    }

    const executeMonitoring = () => {
        let timeDelay = execDelayMillis;

        if ( taskVOStatus == TASK_STATUS.NONE ) {
            taskVOStatus = TASK_STATUS.RUNNING;
        } else {
            //  이미 진행 중이거나 진행이 종료된 경우 어떻게 처리할 것인지 ... 
            return;
        }

        taskMap.forEach( (v,k,map) => {
            setTimeout( 
                () => { v.executeMonitoring();
                    taskRunningMap.set(v.getTaskID(), v.getStatus());
                 }, timeDelay);
            timeDelay += execDelayMillis;
        });
    }

    const requestAbort = (delayMillis) => {
        if ( delayMillis === undefined || delayMillis === null ) {
            delayMillis = execDelayMillis;
        }
        let timeDelay = delayMillis;

        if ( taskVOStatus == TASK_STATUS.RUNNING ) {
            taskVOStatus = TASK_STATUS.ABORTED;
        } else {
            //  이미 진행 중이거나 진행이 종료된 경우 어떻게 처리할 것인지 ... 
            return;
        }

        taskMap.forEach( (v,k,map) => {
            setTimeout( 
                () => { v.requestAbort(); }, timeDelay);
            timeDelay += delayMillis;
        });
    };

    const setTaskFinished = ( taskID, taskStatus )  => {
        //  do some things .. 
        taskResultMap.set ( taskID, taskStatus );
        taskRunningMap.delete(taskID);
        if ( taskRunningMap.size === 0 ) {
            finishedAll = true;

            isSuccessAllDone();            
        }
        console.log ( `RUNNING MAP : ${taskRunningMap.size} , RESULT MAP : ${taskResultMap.size}, FINISHED : ${finishedAll}, STATUS : ${taskVOStatus}`);

        if ( finishedAll ) {
            if ( callbackFinishedFunction ) {
                callbackFinishedFunction(taskGroupID, taskVOStatus, requestID);
            }
            if ( parentObj ) {
                parentObj.setTaskGroupFinished( taskGroupID, taskVOStatus, requestID);
            }
        }
    };

    const setCallbackFunction = (callbackFn) => {
        if ( !callbackFinishedFunction ) {
            callbackFinishedFunction = callbackFn;
            return true;
        } else {
            return false;
        }
    };

    initResource();

    return Object.freeze({
        requestMonitoring, appendTaskMap, getTaskMap, executeMonitoring, requestAbort, removeTaskMapByDTO,
        removeTaskMapByKey, isFinished, getTaskGroupID, getTaskDTOByID, isSuccessAllDone, getCurrentTaskStatus, setTaskFinished, 
        setCallbackFunction, setParentObj, setRequestID
    });
};

const JobTaskVO = (jID, taskVOArray = [], execDelayMillis = 100 ) => {
    const jobID                 = jID;

    let jobStatus               = TASK_STATUS.NONE; 
    let requestID;

    const taskVOMap             = new Map();
    const taskVOReadyMap        = new Map();
    const taskVOResultMap       = new Map();

    let currentRunningVO        = undefined;

    let callbackFinishedFunction   ;

    const setRequestID = (reqID) => {
        requestID = reqID;
    };

    const appendTaskVO = ( taskVO ) => {
        if ( !taskVO ) 
            return false;
        let voID = taskVO.getTaskGroupID();
        if ( !voID ) 
            return false;

        //  재등록 하지 않음
        if ( taskVOMap.has(voID) ) {
            return false;
        }
        taskVO.setCallbackFunction(setTaskGroupFinished);
        taskVOMap.set(voID, taskVO);
        return true;
    }

    const getCurrentTaskStatus = () => {
        const result = {
        };

        taskVOMap.forEach ( (v,k,m) => {
            if ( taskVOResultMap.has(k) ) {
                result[k] = v.getCurrentTaskStatus();
            } else {    
                result[k] = "수행되지 않았습니다.";
            }
        });

        return result;
    }

    const getNextExecutionNextVO = (taskGroupID) => {
        const totalSize = taskVOMap.size;
        if ( totalSize <= 0 ) {
            return;
        }
        if ( !taskGroupID  && !currentRunningVO ) {
            for ( let v of taskVOMap.values()) {
                return v;
            }
            return;
        }
        if ( taskVOReadyMap.size == 0 ) {
            prepareJobRunningStatus();
        }
        if ( !taskGroupID ) {
            taskGroupID = currentRunningVO.getTaskGroupID();
        }
        let orderNum = taskVOReadyMap.get(taskGroupID);
        console.log ( orderNum );
        if ( orderNum === undefined || orderNum === null ) {
            return;
        }
        orderNum = parseInt(orderNum);
        orderNum++;

        console.log ( orderNum );

        for ( let k of taskVOReadyMap.keys() ) {
            console.log ( k, taskVOReadyMap.get(k), orderNum, taskVOReadyMap.size );
            if ( orderNum == taskVOReadyMap.get(k)) {
                return taskVOMap.get(k);
            }
        }
    }

    const setJobStatue = (jobSts) => {
        if ( jobStatus === TASK_STATUS.ABORTED )
            return;
        if ( jobStatus === TASK_STATUS.TIMEOVER  ) {
            return;
        }
        if ( jobStatus === TASK_STATUS.FAILED  ) {
            return;
        }
        jobStatus = jobSts;
    };

    const setTaskGroupFinished = ( taskGgroupID, groupStatus ) => {
        taskVOResultMap.set(taskGgroupID, groupStatus);
        console.log ( `TASK GROUP ID : ${taskGgroupID} , GROUP STATUS : ${groupStatus}`);
        //jobStatus = groupStatus;
        setJobStatue(groupStatus);
        if ( groupStatus === TASK_STATUS.DONE ) {
            requestMonitoring();
        } else {
            if ( callbackFinishedFunction ) {
                setTimeout ( async () => {
                    await callbackFinishedFunction(jobID, taskGgroupID, jobStatus,requestID);
                    console.log ( `JOBS ALL DONE : [ HAS LEFT : ], [ CLOSE STATUS : ${TASK_STATUS.getStatusName(jobStatus)} ]`);
                }, 10);
            }
            console.log ( "setTaskGroupFinished ::: Finished ... All Jobs ", TASK_STATUS.getStatusName(jobStatus)
                , taskGgroupID );

        }
    };

    const prepareJobRunningStatus = () => {
        let index = 0;
        taskVOMap.forEach ( (v, k, map) => {
            taskVOReadyMap.set(k, index);
            index++;
        });
    }

    const initResource = () => {
        taskVOArray.forEach( (v, k, arr) => {
            appendTaskVO(v);
        });
        console.log ( taskVOMap.size );
    }

    initResource();

    const requestMonitoring = () => {
        currentRunningVO = getNextExecutionNextVO();
        if ( currentRunningVO ) {
            if ( jobStatus == TASK_STATUS.NONE || jobStatus == TASK_STATUS.DONE ) {
                jobStatus = TASK_STATUS.RUNNING;
                setTimeout( async () => {
                    currentRunningVO.requestMonitoring();
                }, 3000);
            }
        } else {
            if ( callbackFinishedFunction ) {
                setTimeout ( async () => {
                    await callbackFinishedFunction(jobID, -1,  jobStatus, requestID);
                    console.log ( `JOBS ALL DONE : [ HAS LEFT : ], [ CLOSE STATUS : ${jobStatus} ]`);
                }, 10);
                
            }
            console.log ( "Finished ... All Jobs ", TASK_STATUS.getStatusName(jobStatus) );
        }
    }

    const requestAbort = () => {
        if ( jobStatus == TASK_STATUS.RUNNING ) {
            jobStatus = TASK_STATUS.ABORTED;
        } else {
            //  이미 진행 중이거나 진행이 종료된 경우 어떻게 처리할 것인지 ... 
            return;
        }
        if ( currentRunningVO ) {
            currentRunningVO.requestAbort();
        }
    };


    const setCallbackFunction = (callbackFn) => {
        if ( !callbackFinishedFunction ) {
            callbackFinishedFunction = callbackFn;
            return true;
        } else {
            return false;
        }
    };


    return {
        requestMonitoring, appendTaskVO, setCallbackFunction, requestAbort, getCurrentTaskStatus, 
        setTaskGroupFinished, setRequestID
    };
};


const executeMonitoringOnly = ( taskID, taskKeyValue, monitoringConfigs, callbackFn ) => {
    if ( !taskKeyValue || !monitoringConfigs  ) {
        return; 
    }
    const parsedFunctionConfigs = {
        result: taskKeyValue
    };
    return MonitorTaskDTO(taskID, {}, parsedFunctionConfigs, monitoringConfigs, callbackFn);
}


const makeExecutionConfigValues = (functionType=1, executionFunction, functionArgs={}, executionResult ) => {
    if ( !( executionFunction || executionResult ) ) {
        return undefined;
    }
    const result = {
        fnType:functionType ,
        fn : executionFunction, 
        args : functionArgs, 
        result : executionResult
    };
    return result;
}

const makeAnalysisConfigValues = (functionType=1, analysisFunction, functionArgs={}, analysisResult ) => {
    if ( !( analysisFunction || analysisResult ) ) {
        return undefined;
    }
    const result = {
        fnType:functionType ,
        fn : analysisFunction, 
        args : functionArgs, 
        result : analysisResult
    };
    return result;
}


/**
 * @author : created by KKS
 * @param {*} functionType : 1 async ... 
 * @param {*} monitorFunction : Function 
 * @param {*} functionArgs : Arguments
 * @param {*} monitorTimeMillis : 주기적인 모니터링 시간 ( milliseconds ) : default 5초 
 * @param {*} maxLimitTimeMillis : 최대 모니터링 시간 ( milliseconds ) : default 1시간
 * @param {*} isPrintLog : log 출력 여부
 * @returns 
 */
const makeMonitoringConfigValues = (functionType=1, monitorFunction, functionArgs={}, monitorTimeMillis = 5000, maxLimitTimeMillis=360000, isPrintLog = true ) => {
    if ( !monitorFunction ) {
        return undefined;
    }
    //console.log ( "Why ... " , maxLimitTimeMillis );
    const result = {
        fnType:functionType ,
        fn : monitorFunction, 
        args : functionArgs, 
        monitorMillis : monitorTimeMillis, 
        maxLimitTimeMillis : maxLimitTimeMillis, 
        isPrintLog
    };
    return result;
}

const makeAbortConfigValues = (functionType=1, abortFunction, functionArgs={} ) => {
    if ( !abortFunction ) {
        return undefined;
    }
    const result = {
        fnType:functionType ,
        fn : abortFunction, 
        args : functionArgs
    };
    return result;
}


const makeMonitoringSampleFunction = async ( taskKeyValue, monitoringArgs = {} ) => {
    const result = {'status' : 5, 'finished' : false};
    
    //  do something 

    //  if ( done conditions ) { return { status : 0[조건에 따름], finished : true }}
    return result;
}

const makeCallbackSampleFunction = async ( taskID, taskStatus, taskKeyValue,reqID ) => {
    console.log ( `Callback Function Result : [ taskID : ${taskID} ], [ Status : ${taskStatus} ], [ taskKeyValue : ${taskKeyValue}]`);
}

const TaskDTO = (taskID, taskConfigs = {}) => {
    let status              = -1;   //  -1 none,   0:done, 1:failed, 2: pending, 3: ready, 4: queued, 5: running,  9:aborted
    const _taskID           = taskID;
    const parseFn           = taskConfigs.parseFn;
    let parseResult         = undefined;
    const monitorFn         = taskConfigs.monitorFn; 
    const monitorMillis     = taskConfigs.monitorMillis;
    let timerID             = undefined;
    let finished            = false;

    const getStatus = () => {
        return status;
    };

    const getMonitoringType = () => {

    };

    const isFinished = () => {
        return finished;
    };

    const requestAbort = () => {
        console.log ( "requestAbort");
        status = TASK_STATUS.ABORTED;
        finished = true;
        if ( timerID ) {
            clearTimeout(timerID);
        }
    };

    const executeMonitoring = () => {
        if ( !monitorFn || finished) {
            return;
        }
        timerID = setTimeout( () => {
            console.log ("Monitoring ... ");
            if ( !monitorFn(parseResult) ) {
                executeMonitoring();
            } else {
                console.log("Done");
                status = 0;
                finished = true;
                if ( timerID ) {
                    clearTimeout(timerID);
                } else {
                    clearImmediate();
                }
            }
        }, monitorMillis);
    };

    //  task but 현재는 테스트 
    const requestExecution = async () => {
        if ( parseFn ) {
            console.log ( "requestExecution");
            parseResult = parseFn(taskConfigs.configs);
        }
    }

    return {
        requestAbort, executeMonitoring, requestExecution
    }
}

export default {
    MonitorTaskDTO, makeCallbackSampleFunction, makeMonitoringSampleFunction, makeMonitoringConfigValues, TASK_STATUS, MonitorTaskVO, 
    makeExecutionConfigValues, makeAnalysisConfigValues , JobTaskVO, makeMonitoringDTO, makeAbortConfigValues
};
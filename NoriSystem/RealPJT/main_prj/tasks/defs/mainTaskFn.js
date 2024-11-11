import taskInfo from "#core/dto/taskInfo.js";
import fs from "node:fs";

const executeFileExistsMonitoringFn = async ( analysisResult, monitorFunction={} ) => {
    let finished = false;
    let status = -1;
    try {
        finished = fs.existsSync(analysisResult)
        if ( finished ) {
            status = taskInfo.TASK_STATUS.DONE;
            return {status, finished };
        } else {
            status = taskInfo.TASK_STATUS.RUNNING;
            return {status, finished };
        }
    } catch (e) {
        return {status:taskInfo.TASK_STATUS.RUNNING, finished };
    }
}

const executeByPassAnalysisFn = async ( executeResult, execConfigs ) => {
    return executeResult;
}

const executeByPassMonitoringFn = async( analysisResult, monitorFunction={}) => {
    let finished = true;
    let status = taskInfo.TASK_STATUS.DONE;
    return { status, finished};
}
import fs from "node:fs/promises";

const execUserAnalysisTest001 = async ( args ) => {
    console.log ( args );
    return 'abc.txt';
}

const execUserMonitoringTest001 = async (v) => {
    try {
        await fs.access(v, fs.constants.F_OK );
        //await fs.unlink(v);
        return {status:9, finished:true};
    } catch ( e ) {
        return {status:5, finished:false};
    }
}

export default {
    execUserAnalysisTest001, execUserMonitoringTest001
}



import { spawn, exec } from "node:child_process";
import iconv from "iconv-lite";
import fs from "fs";
import path from "path";


const execStandaloneProcess = async (cmd,args=[],options={}) => {
    let prm = new Promise((resolve,reject) => {
        const rev = {
            status: -1, 
            data: undefined,
            message: undefined,
            subStatus : -1
        };
        if ( !options.detached ) {
            options.detached = true;
        }
        if ( !options.stdio ) {
            options.stdio = "ignore";
        }
        const ev = spawn(cmd,args,options);
        ev.on ('close', (data) => {
            rev.status = 0;
            rev.data = data;
            rev.subStatus = data;
            rev.message = "NORMAL";
            resolve(rev);
        });
        ev.on("error", (e) => {
            rev.status = -1;
            rev.data = e;
            rev.subStatus = -1;
            rev.message = "ERROR";
            reject(rev);
        });
        ev.on("exit", (data) => {
            //console.log("Standalone Exit ", data);
        });
        ev.unref();        
    });
    return prm;
}

const execDefaultProcess = async (cmd,args=[],options={},encoding) => {
    let prm = new Promise((resolve,reject) => {
        //console.log ( cmd , args, options );
        const ev = spawn(cmd,args,options);
        const rev = {
            status: -1, 
            data: undefined,
            message: undefined,
            subStatus : -1
        };
        let result = [];
        ev.stdout.on ('data', (data) => {
            let str = "";
            if ( encoding ) {
                const nd = iconv.decode(data, encoding);
                str = nd.toString();
            } else {
                str = data.toString();
            }
            result.push(str);
        });
        ev.stderr.on ('data', (data) => {
            let str = "";
            if ( encoding ) {
                str = iconv.decode(data, encoding);
            } else {
                str = data.toString();
            }
            console.error(str);
            result.push(str);
        });
        ev.on('error', (e) => {
            rev.status = -1;
            rev.data = e;
            rev.subStatus = -1;
            rev.message = "ERROR";
            reject(rev);
        });
        ev.on ('close', (data) => {
            //console.log("Close : ", data);
            let ssv = (data === 0 ? "SUCCESS" : "FAIL");
            rev.status = 0;
            rev.data = result.join("");
            rev.subStatus = data;
            rev.message = `NORMAL[${ssv}]`;
            resolve(rev);
        });
        ev.on ('exit', (data) => {
            //console.log("Exit : ", data);
        });
    });
    return prm;
}

const execProcessForFileLog = async (cmd,args=[],options={},fileInfo={}, encoding) => {
    let prm = new Promise((resolve,reject) => {
        if ( !fileInfo.fileName ) {
            fileInfo.fileName = "./_sys_def_log.txt";
        }
        if ( !fileInfo.fileDir ) {
            fileInfo.fileDir = __dirname;
        }

        const fileName = path.join(fileInfo.fileDir, fileInfo.fileName);

        const rev = {
            status: -1, 
            data: undefined,
            fileName : fileName, 
            message: undefined,
            subStatus : -1
        };
        let result = [];
        if ( fileInfo.logType === undefined ) {
            fileInfo.logType = 1;
        }
        if ( (fileInfo.logType&1) === 1 ) {
            if ( fs.existsSync(fileName) ) {
                fs.unlink(fileName, (err) => {
                    if ( err ) {
                        console.log(err)
                    } else {
                        console.log(`${fileName} 파일이 삭제 되었습니다.`);
                    }
                });
            }
        }

        const ev = spawn(cmd,args,options);
        
        ev.stdout.on ('data', (data) => {
            let str = "";
            if ( encoding ) {
                const nd = iconv.decode(data, encoding);
                str = nd.toString();
            } else {
                str = data.toString();
            }
            if ( (fileInfo.logType & 1) === 1 ) {
                if ( str ) {
                    if ( fs.existsSync( fileName ) ) {
                        fs.appendFile(fileName, str, (err) => {
                            if ( err ) {
                                console.log("File appending Error", err);
                            } else {
                                console.log("File appending Done!!!");
                            }
                        });
                    } else {
                        fs.writeFile(fileName, str, (err) => {
                            if ( err ) {
                                console.log("File writing Error", err);
                            } else {
                                console.log("File writing Done!!!");
                            }
                        });
                    }
                }
            }
            if ( (fileInfo.logType & 2) === 2 ) {
                console.log(str);
            } 
            if ((fileInfo.logType & 4) === 4 ) {
                result.push(str);
            }
        });
        ev.stderr.on ('data', (data) => {
            let str = "";
            if ( encoding ) {
                str = iconv.decode(data, encoding);
            } else {
                str = data.toString();
            }
            console.error(str);
        });
        ev.on('error', (e) => {
            rev.status = -1;
            rev.data = e;
            rev.subStatus = -1;
            rev.message = "ERROR";
            reject(rev);
        });
        ev.on ('close', (data) => {
            //console.log("Close : ", data);
            let ssv = (data === 0 ? "SUCCESS" : "FAIL");
            rev.status = 0;
            rev.data = result.join("");
            rev.subStatus = data;
            rev.message = `NORMAL[${ssv}]`;
            resolve(rev);
        });
        ev.on ('exit', (data) => {
            //console.log("Exit : ", data);
        });
    });
    return prm;
}

const execProceeForTimeLimitation = async (mode, cmd, args=[], options={},logInfos={}, encoding, timeLimitMillis ) => {
    //console.log ( " execProceeForTimeLimitation called ...   " + timeLimitMillis);
    let result = undefined;
    let act = new AbortController();
    options.signal = act.signal;
    let timeID = undefined;
    if ( timeLimitMillis && timeLimitMillis > 0) {
        timeID = setTimeout(() => {
            act.abort();
        }, timeLimitMillis);
    }
    if ( (mode & 1) == 1 ) {
        result = await execDefaultProcess(cmd, args, options, encoding);
    } else if ( (mode & 2) == 2 ) {
        result = await execProcessForFileLog(cmd, args, options, logInfos, encoding);
    } else if ((mode & 4) == 4 ) {
        result = await execStandaloneProcess(cmd, args, options);
    }
    if ( timeID ) {
        clearTimeout(timeID);
    }
    return result;
}

const execProcessByConfigs = async ( configs ) => {
    if ( !configs ) {
        return undefined;
    }
    let result = undefined;
    let mode = configs.mode;
    if ( !mode ) {
        return result;
    }
    //console.log ( ` MODE : ${mode}`);
    if ( (mode & 8) === 8 ) {
        result = await execProceeForTimeLimitation(mode, configs.cmds, configs.args, configs.options, configs.logInfos, configs.encoding, configs.timeLimitMillis);
    } else if ((mode&1) === 1 ) {
        result = await execDefaultProcess(configs.cmds, configs.args, configs.options, configs.encoding);
    } else if ((mode&2) === 2 ) {
        result = await execProcessForFileLog(configs.cmds, configs.args, configs.options, configs.logInfos,  configs.encoding);
    } else if ((mode&4) === 4 ) {
        result = await execStandaloneProcess(configs.cmds, configs.args, configs.options);
    }
    return result;
}

const makeConfigsFromOrderArray = async ( args, options={}, logInfos={}, encoding, timeLimit=-1) => {
    if ( args && args.length ) {
        try {
            const argLen = args.length;
            if ( argLen < 2 ) {
                return undefined;
            }
            const mode = parseInt(args[0]); //  0 : mode;
            const cmds = args[1].trim();
            const argArr = [];
            let timeLimitMillis = timeLimit;
            if ( (mode&8) === 8 && argLen > 2 && timeLimitMillis < 0  ) {
                timeLimitMillis = parseInt(args[argLen-1]);
                for ( let i = 2; i < argLen-1; i++ ) {
                    argArr.push(args[i].trim());
                }
            } else {
                for ( let i = 2; i < argLen; i++ ) {
                    argArr.push(args[i].trim());
                }
            }
            const result = {
                mode : mode, 
                cmds : cmds, 
                args : argArr, 
                options : options, 
                logInfos : logInfos, 
                encoding: encoding,
                timeLimitMillis : timeLimitMillis
            };
            return result;
        } catch ( e ) {
            return undefined;
        }
    }
    return undefined;
}

export default {
    execStandaloneProcess, execDefaultProcess, execProcessForFileLog, 
    execProceeForTimeLimitation, makeConfigsFromOrderArray, execProcessByConfigs 
};

import {v4} from "uuid";

const makeCommonJsonResult = (data, status=-1, message) => {
    let subStatus = -1;
    if ( !message ) {
        if ( status === -1 ) {
            message = "정상적으로 진행되지 않았습니다.";
        } else if ( status === 0 ) {
            message = "정상적으로 진행되었습니다.";
            subStatus = 0;
        } else {
            message = "진행사항을 확인할 수 없습니다.";
        }
    }
    const result = {
        status : status, 
        data : data, 
        message : message,
        subStatus : subStatus
    }
    return result;
};

const makeUniqueKeyByUUID = () => {
    //  length : 36 
    const id = v4();
    //console.log ( id, id.length );
    return id;
}

const makeUniqueKeyByRandom = (keyLen) => {
    const seed ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const seedLen = seed.length;
    let id = "";
    for ( let i = 0; i < keyLen; i++ ) {
        id += seed[ parseInt( Math.random()*seedLen)];
    }
    //console.log ( id, id.length );
    return id;
}

/**
 * 검색이나 Key Index 순서를 사용할 수 있도록 보장함이 목적
 * @param {} keyLen 
 * @param {*} prefix 
 * @returns 
 */
const makeUniqueKeyByTimeRandom = (keyLen, prefix='') => {
    const seed ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const seedLen = seed.length;
    let id = prefix+Date.now();
    let curLen = id.length;


    if ( curLen >= keyLen ) {
        const cfDate = new Date('2024-01-01T00:00:00');
        id = prefix+(Date.now()-cfDate.getTime());
        curLen = id.length;
        if ( curLen >= keyLen ) {
            return undefined;
        }
    }
    const len = keyLen - curLen;
    for ( let i = 0; i < len; i++ ) {
        id += seed[ parseInt( Math.random()*seedLen)];
    }
    //console.log ( id, id.length);
    return id;
}

const xssFilter = new Map();
const xssReverseFilter = new Map();
const initXssFilterValue = () => {
    const xssFilterJson = {
        '&':'&amp;',
        '"':'&quot;',
        '\'':'&#039;',
        '<':'&lt;',
        '>':'&gt;',
        'script':'scr!pt'
    };
    const arr = [];
    for ( let k of Object.keys(xssFilterJson) ) {
        const v = xssFilterJson[k];
        xssFilter.set(k,v);
        arr.push([v, k]);
    }
    for ( let i = arr.length-1; i >= 0; i-- ) {
        xssReverseFilter.set(arr[i][0], arr[i][1]);
    }
}

const isArrayValue = (v) => {
    return Array.isArray(v);
}

const isStringValue = (v) => {
    return ((typeof v) === 'string');
}

const isJsonValue = (v) => {
    const typeStr = typeof v;
    if ( typeStr === 'object') {
        return !isArrayValue(v);
    }
    return false;
}
initXssFilterValue();

const transXssStringValue = (value) => {
    if ( isStringValue(value)) {
        let result = value;
        for ( let k of xssFilter.keys() ) {
            result = result.replaceAll(k, xssFilter.get(k));
        }
        //console.log ( result );
        return result;
    } else if ( isArrayValue(value)) {
        return transXssStringValueRecursive(value, 2);
    } else if ( isJsonValue(value)) {
        return transXssStringValueRecursive(value, 1);
    } else {
        return value;
    }
}

const transXssStringValueRecursive = (value, typeNum) => {
    if ( typeNum === 1 ) {
        let result = {};
        for ( let k of Object.keys(value)) {
            result[k] = transXssStringValue(value[k]);
        }
        return result;
    } else if ( typeNum === 2 ) {
        let result = [];
        for ( let k of value) {
            result.push(transXssStringValue(k));
        }
        return result;
    } else {
        return value;
    }
}

const reverseTransXssStringValue = (value) => {
    if ( isStringValue(value)) {
        let result = value;
        for ( let k of xssReverseFilter.keys() ) {
            result = result.replaceAll(k, xssReverseFilter.get(k));
        }
        return result;
    } else if ( isArrayValue(value)) {
        return reverseTransXssStringValueRecursive(value, 2);
    } else if ( isJsonValue(value)) {
        return reverseTransXssStringValueRecursive(value, 1);
    } else {
        return value;
    }
}

const reverseTransXssStringValueRecursive = (value, typeNum) => {
    if ( typeNum === 1 ) {
        let result = {};
        for ( let k of Object.keys(value)) {
            result[k] = reverseTransXssStringValue(value[k]);
        }
        return result;
    } else if ( typeNum === 2 ) {
        let result = [];
        for ( let k of value) {
            result.push(reverseTransXssStringValue(k));
        }
        return result;
    } else {
        return value;
    }
}

export const loadDynamicModuleByName = async (jsFullName) => {
    console.log ( jsFullName );
    if ( !jsFullName )
        return undefined;
    
    const jsModule = await import(jsFullName);
    if ( jsModule )
        return jsModule.default;
    return undefined;
}

export const getDefaultDateString = (dateObj) => {
    const defFormat = "yyyy.MM.dd HH:mi:ss";
    return getDateLocaleString(dateObj, defFormat);
}

const getDateLocaleString = (dateObj, formatStr) => {
    const localStr     = "ko-KR";
    let h24Flag = formatStr ? ( /HH|hh24/.test(formatStr) ? false : true ) : false ;
    const timeOpt = {
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: h24Flag, 
        fractionalSecondDigits: 3
    };
    let dateStr = dateObj ? dateObj.toLocaleString(localStr, timeOpt) : (new Date()).toLocaleString(localStr, timeOpt); 
    if ( formatStr ) {
        const dateReg = /([\d]+|오전|오후)/g;
        const dateArr = dateStr.match(dateReg);
        const len = dateArr.length;
        let idx = 0;
        formatStr = formatStr.replace(/yyyy|YYYY/, dateArr[idx]);
        formatStr = formatStr.replace(/yy|YY/, dateArr[idx].substr(2));
        ++idx;
        formatStr = formatStr.replace(/MM/, dateArr[idx]);      
        ++idx;  
        formatStr = formatStr.replace(/dd|DD/, dateArr[idx]);
        if ( len > 7 ) {
            ++idx;
            formatStr = formatStr.replace(/a/, dateArr[idx]);            
        }
        ++idx;
        formatStr = formatStr.replace(/hh24|hh12|HH|hh/, dateArr[idx]);
        ++idx;
        formatStr = formatStr.replace(/mi|mm|MM/, dateArr[idx]);
        ++idx;
        formatStr = formatStr.replace(/SSS/, dateArr[idx+1]);
        formatStr = formatStr.replace(/ss/, dateArr[idx]);
        dateStr = formatStr;
    }
    return dateStr;
};



export default {
    makeUniqueKeyByRandom, makeUniqueKeyByTimeRandom, makeUniqueKeyByUUID, makeCommonJsonResult, transXssStringValue, reverseTransXssStringValue
    , loadDynamicModuleByName,  getDateLocaleString, getDefaultDateString
    , isArrayValue, isJsonValue, isStringValue
};

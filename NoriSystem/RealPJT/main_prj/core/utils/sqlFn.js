import common from './common.js'

const makeParmeterSQL = ( data ) => {
    let result = '';
    if ( !data ) {
        return result;
    }
    if ( common.isArrayValue(data)) {
        for ( let i = 0, len = data.length; i < len; i++ ) {
            if ( i > 0 ) {
                result += ',?';
            } else {
                result += '?';
            }
        }
    } else if (common.isJsonValue(data) ) {
        for ( let i = 0, len = Object.keys(data).length; i < len; i++ ) {
            if ( i > 0 ) {
                result += ',?';
            } else {
                result += '?';
            }
        }
    } else {
        result = '?'
    } 
    return result;
};

const makeJsonParameterValues = (data, keyArray) => {
    let result = [];
    if ( common.isJsonValue(data) ) {
        if ( !keyArray ) {
            keyArray = Object.keys(data);
        }
        for ( const k of keyArray ) {
            if ( data[k] ) {
                result.push( data[k]);
            } else {
                result.push( undefined );
            }
        }
    } else if ( common.isStringValue(data)) {
        result.push(data);
    }
    return result;
}

const makeJsonParmeterValueArray = ( data, keyArray ) => {
    let result = [];
    if ( !data ) {
        return result;
    }
    if ( common.isArrayValue(data)) {
        data.forEach( (v,idx,arr) => {
            const params = makeJsonParameterValues(v, keyArray);
            result.push(params);
        });
    } else if (common.isJsonValue(data) ) {
        if ( !keyArray ) {
            keyArray = Object.keys(data);
        }
        for ( const k of keyArray ) {
            if ( data[k] ) {
                result.push( data[k]);
            } else {
                result.push( undefined );
            }
        }
    } else {
        result.push(data);
    } 
    return result;
};

const makeTranslateDynamicSQL = (originalSQL, replaceSQL, replacePart, shoudVerify = true) => {
    if ( !originalSQL ) {
        return originalSQL;
    }
    if ( !replaceSQL ) {
        return originalSQL;
    }
    if ( !replacePart ) {
        replacePart = '';
        shoudVerify = false;
    }
    const regObj = new RegExp(replaceSQL,'gi');
    if ( shoudVerify ) {
        replacePart = common.transXssStringValue(replacePart);
    }
    return originalSQL.replace(regObj, replacePart);
};

const makeTranslateDynamicSQLValues = (originalSQL, transKeyValue = {} , shoudVerify = true) => {
    if ( !originalSQL ) {
        return originalSQL;
    }
    let result = originalSQL;
    Object.keys(transKeyValue).forEach( (v, idx, map) => {
        result = makeTranslateDynamicSQL(result, v, transKeyValue[v], shoudVerify );
    });
    return result;
}



export default {
    makeParmeterSQL, makeJsonParmeterValueArray, makeTranslateDynamicSQL, makeTranslateDynamicSQLValues
};



const makeDefaultValueDTO = () => {
    const resultArray   = [];
    const resultJson    = {};

    const isDTO = () => {
        return true;
    };

    const makeResultValue = () => {
        return {
            dataArray : resultArray, 
            dataJson : resultJson
        };
    };

    const appendDataArray = (arrayValue) => {
        if ( arrayValue ) {
            resultArray.push(arrayValue);
            return true;
        };
        return false;
    };

    const appendDataJson = (jsonKey, jsonValue, isReplace=false) => {
        if ( jsonKey && jsonValue ) {
            if ( resultJson.hasOwnProperty(jsonKey) ) {
                if ( isReplace ) {
                    resultJson[jsonKey] = jsonValue;
                    return true;
                } else {
                    return false;
                }
            } else {
                resultJson[jsonKey] = jsonValue;
            }
            return true;
        };
        return false;
    };

    const getDataArrays = () => {
        return resultArray;
    }; 

    const getDataArrayByIndex = (idx) => {
        if ( idx >= 0 &&  dataArray.length > idx) {
            return resultArray[idx];
        }
        return undefined;
    };
    
    /**
     * 불변성으로 구성할 경우 다른 구조 필요함
     * @param {*} idx 
     * @returns 
     */
    const removeDataArrayByIndex = (idx) => {
        if ( idx >= 0 &&  resultArray.length > idx) {
            return resultArray.splice(idx,1);
        }
        return undefined;
    }

    const getDataJsons = () => {
        return dataJson;
    }; 

    const getDataJsonByKey = (jsonKey) => {
        if ( jsonKey && resultJson.hasOwnProperty(jsonKey) ) {
            return resultJson[jsonKey];
        }
        return undefined;
    }; 

    const removeDataJsonByKey = (jsonKey) => {
        if ( jsonKey && resultJson.hasOwnProperty(jsonKey) ) {
            delete resultJson[jsonKey];
        }
        return undefined;
    };

    const setServiceDataValues = (values, jsonKey) => {
        if ( !values )  {
            console.log ( "등록할 값이 없습니다.");
        };
        if ( jsonKey ) {
            return appendDataJson(jsonKey, values)
        } else {
            return appendDataArray(values);
        }
    }
    
    
    return Object.freeze({
        isDTO, makeResultValue,appendDataArray, appendDataJson, getDataArrays, setServiceDataValues,
        getDataArrayByIndex, removeDataArrayByIndex, getDataJsons, getDataJsonByKey,removeDataJsonByKey
    });
};


const setServiceDataValues = (values, jsonKey, dtoObj) => {
    if ( !values )  {
        console.log ( "등록할 값이 없습니다.");
        return;
    };
    if ( !dtoObj || !dtoObj.isDTO() ) {
        console.log("저장할 공간이 없습니다.");
        return;
    }
    if ( jsonKey ) {
        return dtoObj.appendDataJson(jsonKey, values)
    } else {
        return dtoObj.appendDataArray(values);
    }
}

export default {
    setServiceDataValues, makeDefaultValueDTO
};

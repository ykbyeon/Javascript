

const sendPostAjax = async ( url, jsonData ) => {
    try {
        const sendData = {
            method:"POST", 
            cache : "no-cache",
            headers : {
                "Content-Type": "application/json; charset=utf-8",
            }, 
            body: JSON.stringify(jsonData),
        };
        const response = await fetch(url, sendData);
        const jsonValue = await response.json();
        return jsonValue;
    } catch ( e ) {
        throw e;
    } 
}

export default { sendPostAjax }
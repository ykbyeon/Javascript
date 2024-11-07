// 2024.11.07 main_test프로그램의 common.js 파일내용을 기준으로, 필요한 항목들만 추려냄 - yk.byeon

const makeCommonJsonResult = (data, status = -1, message) => {
    let subStatus = -1;
    if (!message) {
        if (status === -1) {
            message = "정상적으로 진행되지 않았습니다.";
        } else if (status === 0) {
            message = "정상적으로 진행되었습니다.";
            subStatus = 0;
        } else {
            message = "진행사항을 확인할 수 없습니다.";
        }
    }
    const result = {
        status: status,
        data: data,
        message: message,
        subStatus: subStatus
    }
    return result;
};

export default {
    makeCommonJsonResult,
};

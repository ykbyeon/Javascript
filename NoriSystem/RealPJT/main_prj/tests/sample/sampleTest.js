import initializer from "#core/utils/initializer.js";
import sampleController from "#controllers/sampleController.js";


await initializer.initializeConfig();
await initializer.initializeConfigPost();

const limitParam = ['', 5];
const inParam = ['TEST_001','TEST_002', 'TEST_003'];
const params = {
    simpleData : limitParam,
    simpleInData: inParam
}

const result = await sampleController.sampleCtrlTest(params);
//console.dir( result.data.simpleResult );
//console.dir(result.data.simpleInResult);
const sDataLen = result.data.simpleResult.length;
const inDataLen = result.data.simpleInResult.length;

console.log ( '-----------------------------------------------------------------------------------------------------');
console.log("");
console.dir ( result );
console.log( `Status : ${result.status} , Message : ${result.message} , simpleResult Len : ${sDataLen}, simpleInResult Len : ${inDataLen} `);

console.log("");

console.log ( '-----------------------------------------------------------------------------------------------------');
console.log("");
const resultDtoValue = await sampleController.sampleCtrlDTOTest(params);
console.dir ( resultDtoValue );
//console.log ( resultDtoValue.data.dataJson.sampleJsonKey );
console.log( `Status : ${resultDtoValue.status} , Message : ${resultDtoValue.message} , simpleResult Len : ${resultDtoValue.data.dataArray[0].length}, simpleInResult Len : ${resultDtoValue.data.dataJson.sampleJsonKey.length} `);
console.log("");
console.log ( '-----------------------------------------------------------------------------------------------------');

//  원칙은 application 이 종료할 때 해당 프로세스가 호출되어야 하지만, 
//  테스트 단계에서 이 코드를 사용함 .. 
//  실제 서비스 에서는 해당 코드는 사용하지 않을 예정임 ...
sampleController.closeResource();
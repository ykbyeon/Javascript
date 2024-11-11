import common from "#core/utils/common.js"

const moduleName = "../../tests/studyTest.js";
const name = "justCallback";

const runExec = await common.loadDynamicModuleByName(moduleName);
//console.log ( runExec );
console.log ( runExec[name] );
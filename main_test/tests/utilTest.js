import common from "#core/utils/common.js";
import sqlFn from "#core/utils/sqlFn.js";

const dt = new Date();
dt.setHours(16);

let fStr = "yyyy/MM/dd HH:mm:ss.SSS";
fStr = "MM DD YYYY";
fStr = "yyyy/MM/dd HH:MM:ss";

console.log ( common.getDateLocaleString( undefined, fStr));
console.log (`[ ${common.getDateLocaleString()}  ,  ${common.getDefaultDateString()} ] ` );


const jObj = {
    'a':1, 
    'b':'test',
    'c':0.487
};

const kArr = ['c','a', 'b', 'c', 'k', 'a'];

console.log (` In SQL : ${sqlFn.makeParmeterSQL(jObj)} `);
console.log (` JSON SQL : ${sqlFn.makeJsonParmeterValueArray(jObj, kArr)} `);

console.log ( `kArr : ${kArr}`);


const orgSql = `select @columns
from @froms
where exists (
    @exists
)
`;
const columnSql = ' ID, NAME, TTT, \"DATE\" ';
const org1 = sqlFn.makeTranslateDynamicSQL(orgSql, '@columns', columnSql, true);
console.log ( orgSql, columnSql, org1 );
console.log ( org1 );

const froms = "( select * from abc_test a where t=? ) a ";
const exists = " select * from t as v where a.id=t.id and t.tt in ( @inQuery )  ";

const exeTrans = sqlFn.makeTranslateDynamicSQL(exists, '@inquery', sqlFn.makeParmeterSQL( kArr));

const jobs = {
    '@columns': columnSql, 
    '@froms': froms, 
    '@exists' : exeTrans
};

const sss = sqlFn.makeTranslateDynamicSQLValues(orgSql, jobs, true);
console.log ( '-------------------------------------');
console.log ( sss );

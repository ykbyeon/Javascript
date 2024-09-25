/**
 * try...catch
 * 
 * 1) 에러를 발생시킬 때 -> 던진다고 한다. (throw)
 * 2) 에러를 명시적으로 인지할 때 -> 잡는다고 한다. (catch)
 */

function runner() {
    try {
        console.log('Hello');

        //throw new Error('큰 문제가 생겼습니다!');  // new 는 다음 섹션에서 설명예정.

        console.log('Code Factory');
    } catch (e) {
        console.log('---catch---');
        console.log(e);
    } finally { //try에서 에러가 발생했던 안했던 상관없이, 무조건 실행이 되는 구문
        console.log('---finally---');

    }
};

runner();

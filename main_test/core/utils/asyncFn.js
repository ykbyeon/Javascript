const asyncWrapper = (fn) => {
    return ( 
        async ( ...args ) => {
            try {
                return await fn(...args);
            } catch ( err ) {
                console.log ( `Error : ${err}`); 
                return err;
            }
        }
    );
}

const asyncRouterWrapper = (fn) => {
    return ( 
        async (req,res,next) => {
            try {
                return await fn(req,res,next);
            } catch ( err ) {
                console.log ( `Error : ${err}`);                
                next(err);
            }
        }
    );
}

export default {
    asyncWrapper, asyncRouterWrapper
};
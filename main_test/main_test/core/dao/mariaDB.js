import mariadb from "mariadb";

const mariaPoolInfos = {
    mariaPool: undefined
};

const initializeMariaPool = () => {
    const pool = mariadb.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_DATABASE, 
        connectionLimit: process.env.DB_CONN_LIMIT
    });
    return pool;
};

const getPooledConnection = async () => {
    try {
        if ( !mariaPoolInfos.mariaPool ) {
            mariaPoolInfos.mariaPool = initializeMariaPool();
        }
        return await mariaPoolInfos.mariaPool.getConnection();
    } catch ( e ) {
        throw e;
    }
}


const getPooledTrxConnection = async () => {
    let conn = undefined;
    try {
        conn = await getPooledConnection();
        try {
            await conn.beginTransaction();
        } catch ( err ) {
            throw err;
        }
    } catch ( e ) {
        throw e;
    }
    return conn;
}


const releasePooledConnection = async (conn) => {
    try {
        if ( conn ) {
            conn.end();
            return true;
        }
        return false;
    } catch ( e ) {
        console.error(`Connection Close Error : \n ${e}`);
        return false;
    }
}

const releasePooledTrxConnection = async (conn) => {
    try {
        if ( conn ) {
            await conn.rollback();
            conn.end();
            return true;
        }
        return false;
    } catch ( e ) {
        console.error(`Connection Close Error : \n ${e}`);
        return false;
    }
}


const modifyBatch = async (conn, query, data) => {
    try {
        return await conn.batch( query, data );
    } catch ( err ) {
        throw err;
    } 
}

const insertQuery = async (conn, query, data) => {
    try {
        return await conn.query( query, data );
    } catch ( err ) {
        throw err;
    } 
}

const selectQuery = async (conn, query, data) => {
    try {
        return await conn.query( query, data );
    } catch ( err ) {
        throw err;
    } 
}

const updateQuery = async (conn, query, data) => {
    try {
        return await conn.query( query, data );
    } catch ( err ) {
        throw err;
    } 
}

const deleteQuery = async (conn, query, data) => {
    try {
        return await conn.query( query, data );
    } catch ( err ) {
        throw err;
    } 
}

const graceShutdownPool = async () => {
    if ( mariaPoolInfos.mariaPool ) {
        console.log ( "Maria DB Pool closing ... ");
        await mariaPoolInfos.mariaPool.end();
    }
}

const getVersion = () => {
    return "0.0.1";
}

export default {
    graceShutdownPool, deleteQuery, updateQuery, selectQuery, insertQuery, modifyBatch, 
    releasePooledTrxConnection, releasePooledConnection, getPooledTrxConnection , getPooledConnection, initializeMariaPool, getVersion
};




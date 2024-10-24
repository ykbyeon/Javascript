import crypto from "node:crypto";

const CryptoAes256Fn = (key, iv) => {
    const _key = key;
    const _iv = iv;
    const algorithm = 'aes-256-cbc';

    const encryptValue = (value) => {
        const chiper = crypto.createCipheriv(algorithm, _key, _iv);
        let result = chiper.update(value,'utf8','base64');
        result += chiper.final('base64');
        return result;
    };

    const decryptValue = (value) => {
        const dechiper = crypto.createDecipheriv(algorithm, _key, _iv);
        let result = dechiper.update(value, 'base64','utf8');
        result += dechiper.final("utf8");
        return result;
    }

    const encryptHexValue = (value) => {
        const chiper = crypto.createCipheriv(algorithm, _key, _iv);
        let result = chiper.update(value,'utf8','hex');
        result += chiper.final('hex');
        return result;
    };

    const decryptHexValue = (value) => {
        const dechiper = crypto.createDecipheriv(algorithm, _key, _iv);
        let result = dechiper.update(value, 'hex','utf8');
        result += dechiper.final("utf8");
        return result;
    }

    return Object.freeze({
        encryptValue, decryptValue, encryptHexValue, decryptHexValue
    });
}

export default {
    CryptoAes256Fn
}
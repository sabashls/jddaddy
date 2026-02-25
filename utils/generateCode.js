import crypto from 'crypto';

const generateShortCode = () => {
    return crypto.randomBytes(3).toString('hex');
}

export default generateShortCode;
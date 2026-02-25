import rateLimiter from 'express-rate-limit';

const limiter = rateLimiter({   
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
}); 

export default limiter;
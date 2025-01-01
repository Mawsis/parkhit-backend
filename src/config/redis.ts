import { createClient } from 'redis';

const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    },
});

redisClient.on('error', (err) => {
    console.error('Redis Client Error', err);
});

(async () => {
    await redisClient.connect();
})();

export default redisClient;

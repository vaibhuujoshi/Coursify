import RedisStore from "rate-limit-redis";
import redisClient from "./redis.js";

const rateLimitStore = new RedisStore({
    sendCommand: (...args) => redisClient.sendCommand(args),
    prefix: "rl:"
});

export default rateLimitStore
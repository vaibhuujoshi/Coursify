import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

const redisClient = await createClient({
    url: process.env.REDIS_URL
})

redisClient.on("error", (err) => console.log("Redis Error", err));

await redisClient.connect();

export default redisClient;
import redis from "redis";

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

export default client;

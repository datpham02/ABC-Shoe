import Redis from 'ioredis'

const redis = new Redis({
    host: process.env.NEXT_PUBLIC_REDIS_HOST,
    port: parseInt(process.env.NEXT_PUBLIC_REDIS_PORT as string),
    password: process.env.NEXT_PUBLIC_REDIS_PASSWORD,
})

export default redis

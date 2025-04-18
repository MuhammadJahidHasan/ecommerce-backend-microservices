import { Inject } from '@nestjs/common';
import { ICacheService } from './cache.interface';
import Redis from 'ioredis';

export class CacheService implements ICacheService {
    constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

    async get(key: string): Promise<any> {
        return await this.redis.get(key);
    }

    async set(key: string, value: any, ttl?: number): Promise<void> {
        await this.redis.set(key, value);
        if (ttl) {
            await this.redis.expire(key, ttl);
        }
    }

    async delete(key: string): Promise<void> {
        await this.redis.del(key);
    }

    async isExists(key: string): Promise<boolean> {
        const exists = await this.redis.exists(key);
        return exists === 1;
    }
}

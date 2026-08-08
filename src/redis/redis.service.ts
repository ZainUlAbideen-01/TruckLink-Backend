// src/redis/redis.service.ts
import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from './redis.provider';

@Injectable()
export class RedisService {
  constructor(@Inject(REDIS_CLIENT) private readonly client: Redis) {}

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  /**
   * Set a key. If ttlSeconds is provided, the key expires after that many seconds.
   */
  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (ttlSeconds) {
      await this.client.set(key, value, 'EX', ttlSeconds);
    } else {
      await this.client.set(key, value);
    }
  }

  async del(key: string): Promise<void> {
    await this.client.del(key);
  }

  async ttl(key: string): Promise<number> {
    return this.client.ttl(key);
  }

  /**
   * Atomically increment a counter key, setting its TTL only on first creation.
   * Used for OTP resend rate-limiting (§2: max N requests per window).
   */
  async incrWithWindow(key: string, windowSeconds: number): Promise<number> {
    const count = await this.client.incr(key);
    if (count === 1) {
      await this.client.expire(key, windowSeconds);
    }
    return count;
  }

  /** Get + JSON.parse convenience helper (used for signup_token payloads) */
  async getJson<T>(key: string): Promise<T | null> {
    const raw = await this.get(key);
    return raw ? (JSON.parse(raw) as T) : null;
  }

  async setJson<T>(key: string, value: unknown, ttlSeconds?: number): Promise<T | void> {
    await this.set(key, JSON.stringify(value), ttlSeconds);
  }
}
// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from './redis/redis.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { MailModule } from './mail/mail.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DriversModule } from './drivers/drivers.module';
import { RecruitersModule } from './recruiters/recruiters.module';
import { JobPostingsModule } from './job-postings/job-postings.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI as string),
    RedisModule,
    CloudinaryModule,
    MailModule,
    UsersModule,
    AuthModule,
    DriversModule,
    RecruitersModule,
    JobPostingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
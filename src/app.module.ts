import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AiModule } from './ai/ai.module';
import { OpenaiService } from './ai/services/openai.service';
import { AuthModule } from './auth/auth.module';
import { EnvVars } from './env.model';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService<EnvVars>) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST', { infer: true }),
        port: configService.get('POSTGRES_PORT', { infer: true }),
        username: configService.get('POSTGRES_USER', { infer: true }),
        password: configService.get('POSTGRES_PASSWORD', { infer: true }),
        database: configService.get('POSTGRES_DB', { infer: true }),
        autoLoadEntities: true,
        synchronize: false
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    PostsModule,
    AuthModule,
    AiModule,
  ],
  providers: [OpenaiService],
})

export class AppModule {}


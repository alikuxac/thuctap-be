import { Module } from '@nestjs/common';
import { AppController } from '#controllers/app.controller';
import { AppService } from '../services/app.service';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

// Custom Controllers
import { healthController } from '#controllers/health.controller';

// Custom modules
// import { HealthModule } from './common/heath.module';
import { CategoryModule } from './category.module';
import { VoucherModule } from './common/voucher.module';
import { FeedBackModule } from './common/feedback.module';
import { TableModule } from './common/table.module';
import { OrderModule } from './order.module';
import { UserModule } from './user.module';
import { ProductModule } from './product.module';
import { AuthModule } from '#auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TerminusModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: configService.get('DB_SYNC') === 'true',
      }),
    }),

    // Custom modules
    // HealthModule,
    CategoryModule,
    VoucherModule,
    FeedBackModule,
    TableModule,
    OrderModule,
    UserModule,
    ProductModule,
    AuthModule,
  ],
  controllers: [AppController, healthController],
  providers: [AppService],
})
export class AppModule {}

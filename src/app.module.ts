import { Module } from '@nestjs/common';
import { DeviceModule } from './modules/device/device.module';
import { CustomerModule } from './modules/customer/customer.module';
import { SharedModule } from './modules/shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmoptions } from './db/dataSource';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { JwtGuard } from './modules/auth/guards/jwt.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmoptions),
    DeviceModule,
    CustomerModule,
    SharedModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}

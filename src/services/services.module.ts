import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleService } from './schedule.service';
import { UserService } from './user.service';

const services = [UserService, ScheduleService];
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'Test',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [],
  providers: services,
  exports: services,
})
export class ServicesModule {}

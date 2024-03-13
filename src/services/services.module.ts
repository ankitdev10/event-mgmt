import { Module } from '@nestjs/common';
import { UserService } from './user.service';

const services = [UserService];
@Module({
  imports: [],
  controllers: [],
  providers: services,
  exports: services,
})
export class ServicesModule {}

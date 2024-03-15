import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';

const services = [UserService];
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: String(process.env.JWT_SECRET),
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [],
  providers: services,
  exports: services,
})
export class ServicesModule {}

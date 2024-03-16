import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcrypt';
import { RequestContext } from 'src/api/request-context';
import {
  InvalidCredentialsError,
  UserAlreadyExistsError,
} from 'src/common/errors';
import { ID } from 'src/common/types';
import { User } from 'src/entities';
import { CreateUserInput } from 'src/generated';
import { DataSource, Repository } from 'typeorm';
@Injectable()
export class UserService {
  private userRepo: Repository<User>;
  constructor(
    private dataSource: DataSource,
    private jwtService: JwtService,
  ) {
    this.userRepo = this.dataSource.getRepository(User);
  }
  async createUser(
    input: CreateUserInput,
  ): Promise<User | UserAlreadyExistsError> {
    const userExists = await this.userRepo.exists({
      where: {
        emailAddress: input.emailAddress,
      },
    });

    if (userExists) return new UserAlreadyExistsError();
    const user = this.userRepo.create(input);
    const hashPassword = hashSync(input.password, 12);
    user.password = hashPassword;
    return this.userRepo.save(user);
  }

  async login(
    ctx: RequestContext,
    username: string,
    password: string,
  ): Promise<User | InvalidCredentialsError> {
    const user = await this.userRepo
      .findOne({
        where: {
          emailAddress: username,
        },
      })
      .then((u) => u ?? undefined);
    if (!user) return new InvalidCredentialsError();
    const match = compareSync(password, user.password);
    if (!match) return new InvalidCredentialsError();

    delete user.password;
    const token = await this.jwtService.signAsync({ user });

    ctx.res.header('Authorization', `Bearer ${token}`);
    ctx.user = user;

    return user;
  }

  async user(id: ID): Promise<User | undefined> {
    return this.userRepo
      .findOne({
        where: {
          id,
        },
      })
      .then((u) => u ?? undefined);
  }

  async users(): Promise<User[]> {
    return this.userRepo.find();
  }
}

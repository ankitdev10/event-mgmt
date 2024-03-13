import { Injectable } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { UserAlreadyExistsError } from 'src/common/errors';
import { ID } from 'src/common/types';
import { User } from 'src/entities';
import { CreateUserInput } from 'src/generated';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserService {
  private userRepo: Repository<User>;
  constructor(private dataSource: DataSource) {
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

  async user(id: ID): Promise<User | undefined> {
    return this.userRepo
      .findOne({
        where: {
          id,
        },
      })
      .then((u) => u ?? undefined);
  }
}

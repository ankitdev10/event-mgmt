import { Injectable } from '@nestjs/common';
import { QueryGreetArgs } from 'src/generated';

@Injectable()
export class TestService {
  greet(args: QueryGreetArgs) {
    return `Hello ${args.name}`;
  }
}

import { Request, Response } from 'express';
import { User } from 'src/entities';

export class RequestContext {
  private readonly _req: Request;
  private readonly _res: Response;
  private _user: User;

  constructor(options: { req: Request; res: Response }) {
    this._req = options.req;
    this._res = options.res;
  }

  get req(): Request {
    return this._req;
  }

  get res(): Response {
    return this._res;
  }

  set user(user: User) {
    this._user = user;
  }

  get user(): User {
    return this._user;
  }
}

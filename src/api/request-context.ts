import { Request, Response } from 'express';
import { User } from 'src/generated';

export class RequestContext {
  private readonly _req: Request;
  private readonly _res: Response;
  public _user: User;

  constructor(options: { req: Request; res: Response; user: User }) {
    this._req = options.req;
    this._res = options.res;
    this._user = options.user;
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
}

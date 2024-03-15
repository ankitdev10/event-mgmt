// import { Request, Response } from 'express';
// import { ApiType, CachedSession, Role } from 'src/common/types';

// export class RequestContext {
//   private readonly _req: Request;
//   private readonly _res: Response;
//   private _session?: CachedSession;
//   private readonly _apiType: ApiType;

//   constructor(options: {
//     req: Request;
//     res: Response;
//     session: CachedSession | undefined;
//     apiType: ApiType;
//   }) {
//     this._req = options.req;
//     this._res = options.res;
//     this._session = options.session;
//     this._apiType = options.apiType;
//   }

//   get req(): Request {
//     return this._req;
//   }

//   get res(): Response {
//     return this._res;
//   }

//   get apiType(): ApiType {
//     return this._apiType;
//   }

//   get session(): CachedSession | undefined {
//     return this._session;
//   }

//   userHasRole(role: Role): boolean {
//     if (!this.session) return false;
//     return this.session.user.role === role;
//   }

//   setSession(session: CachedSession) {
//     this._session = session;
//   }
// }

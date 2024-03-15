import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Context } from 'vm';
import { IS_ALLOW_KEY } from '../decorators/allow.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAllowed = this.reflector.getAllAndOverride<boolean>(IS_ALLOW_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isAllowed) return true;
    const ctx = GqlExecutionContext.create(context).getContext();
    const token = this.extractTokenFromHeader(ctx);
    if (!token) throw new UnauthorizedException();
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'Test',
      });
      // TODO: make a RequestContext class and persist session
      ctx.req['user'] = payload;
    } catch (err) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(ctx: Context): string | undefined {
    const token = ctx.req.get('Authorization')?.split(' ');
    if (!token) return undefined;
    return token[1] ?? undefined;
  }
}

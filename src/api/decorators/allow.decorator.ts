import { SetMetadata } from '@nestjs/common';

export const IS_ALLOW_KEY = 'isAllow';
export const Allow = () => SetMetadata(IS_ALLOW_KEY, true);

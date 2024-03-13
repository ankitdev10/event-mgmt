import { ErrorCode } from 'src/generated';
export class ErrorResult {
  readonly __typename: string;
  readonly errorCode: string;
  readonly message: string;
}

export class UserAlreadyExistsError extends ErrorResult {
  readonly __typename = 'UserAlreadyExistsError';
  readonly errorCode: ErrorCode = ErrorCode.USER_ALREADY_EXISTS;
  readonly message: string = 'User already exists with this email.';
}

const errorTypeNames = ['UserAlreadyExistsError'];

function isGraphQLError(input: any) {
  return (
    input instanceof ErrorResult || errorTypeNames.includes(input.__typename)
  );
}
export const ErrorTypeResolver = {
  CreateUserResult: {
    __resolveType(value: any) {
      return isGraphQLError(value) ? value.__typename : 'User';
    },
  },
};

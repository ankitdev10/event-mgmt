export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type CreateScheduleInput = {
  schedule: Scalars['JSON']['input'];
  weekStart?: InputMaybe<Scalars['Date']['input']>;
};

export type CreateUserInput = {
  emailAddress: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserResult = User | UserAlreadyExistsError;

export enum ErrorCode {
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS'
}

export type ErrorResult = {
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

export type InvalidCredentialsError = ErrorResult & {
  __typename?: 'InvalidCredentialsError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

export type LoginResult = InvalidCredentialsError | User;

export type Mutation = {
  __typename?: 'Mutation';
  createSchedule?: Maybe<Scalars['String']['output']>;
  createUser: CreateUserResult;
  login: LoginResult;
};


export type MutationCreateScheduleArgs = {
  input?: InputMaybe<CreateScheduleInput>;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  emailAddress: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
};

export type UserAlreadyExistsError = ErrorResult & {
  __typename?: 'UserAlreadyExistsError';
  errorCode: ErrorCode;
  message: Scalars['String']['output'];
};

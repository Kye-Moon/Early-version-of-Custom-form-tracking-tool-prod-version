/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AttachmentsInput = {
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type CreateCrewLogInput = {
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  jobId: Scalars['String']['input'];
  jobScopeItemId?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateJobAttachmentsInput = {
  attachments: Array<AttachmentsInput>;
  jobId: Scalars['String']['input'];
};

export type CreateJobInput = {
  crew?: InputMaybe<Array<Scalars['String']['input']>>;
  customerName?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  scopeItems?: InputMaybe<Array<CreateJobScopeItemViaJobInput>>;
  status?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateJobRecordInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  equipment?: InputMaybe<Scalars['String']['input']>;
  flag?: InputMaybe<Scalars['String']['input']>;
  hours?: InputMaybe<Scalars['String']['input']>;
  imageUrls?: InputMaybe<Array<Scalars['String']['input']>>;
  jobId: Scalars['String']['input'];
  materials?: InputMaybe<Scalars['String']['input']>;
  numPeople?: InputMaybe<Scalars['String']['input']>;
  scopeRef?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  type: Scalars['String']['input'];
  who?: InputMaybe<Scalars['String']['input']>;
};

export type CreateJobScopeItemInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  jobId: Scalars['String']['input'];
  reference?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateJobScopeItemViaJobInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  reference?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateOrganisationInput = {
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  phone: Scalars['String']['input'];
  role: Scalars['String']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
};

export type CreateVariationInitialDataInput = {
  equipment?: InputMaybe<Scalars['String']['input']>;
  hours?: InputMaybe<Scalars['String']['input']>;
  materials?: InputMaybe<Scalars['String']['input']>;
  numPeople?: InputMaybe<Scalars['String']['input']>;
  who?: InputMaybe<Scalars['String']['input']>;
};

export type CreateVariationResourceInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  hours?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  jobRecordId: Scalars['String']['input'];
  numPeople?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['String']['input']>;
  rate?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
  unit?: InputMaybe<Scalars['String']['input']>;
  unitPrice?: InputMaybe<Scalars['String']['input']>;
};

export type CrewLog = {
  __typename?: 'CrewLog';
  createdAt: Scalars['DateTime']['output'];
  endTime?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  job: Job;
  jobScopeItem: JobScopeItem;
  notes?: Maybe<Scalars['String']['output']>;
  startTime?: Maybe<Scalars['DateTime']['output']>;
  user: User;
};

export type Job = {
  __typename?: 'Job';
  attachments: Array<JobAttachment>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  customerName?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  ownerId: Scalars['String']['output'];
  scopeItems?: Maybe<Array<JobScopeItem>>;
  status?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  variations?: Maybe<Array<JobRecord>>;
};

export type JobAttachment = {
  __typename?: 'JobAttachment';
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  jobId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type JobCrewMember = {
  __typename?: 'JobCrewMember';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export type JobRecord = {
  __typename?: 'JobRecord';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  flag?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  images: Array<JobRecordImage>;
  initialData?: Maybe<VariationInitialData>;
  job: Job;
  resources: Array<VariationResource>;
  scopeItem?: Maybe<JobScopeItem>;
  scopeRef?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  submittedBy: User;
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type JobRecordImage = {
  __typename?: 'JobRecordImage';
  createdAt: Scalars['DateTime']['output'];
  crewLogId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type JobRecordSearchInput = {
  filter?: InputMaybe<Scalars['String']['input']>;
  jobId?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type JobScopeItem = {
  __typename?: 'JobScopeItem';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  jobId: Scalars['String']['output'];
  reference?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type JobSearchInput = {
  customerName?: InputMaybe<Scalars['String']['input']>;
  includeOwner?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  ownerId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  access_token: Scalars['String']['output'];
  refresh_token: Scalars['String']['output'];
  user: UserAuth;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCrewLog: CrewLog;
  createJob: Job;
  createJobAttachments: Array<JobAttachment>;
  createJobRecord: JobRecord;
  createJobScopeItem: JobScopeItem;
  createOrganisation: Organisation;
  createUser: User;
  createVariationInitialData: VariationInitialData;
  createVariationResource: VariationResource;
  deleteJob: Scalars['Boolean']['output'];
  login: LoginResponse;
  removeCrewLog: CrewLog;
  removeJobAttachment: Scalars['Boolean']['output'];
  removeJobScopeItem: JobScopeItem;
  removeOrganisation: Organisation;
  removeUser: User;
  removeVariation: JobRecord;
  removeVariationResource: VariationResource;
  requestVerificationCode: VerificationTokenResponse;
  resetPassword: LoginResponse;
  signup: LoginResponse;
  updateCrewLog: CrewLog;
  updateJob: Job;
  updateJobRecord: JobRecord;
  updateJobScopeItem: JobScopeItem;
  updateOrganisation: Organisation;
  updateUser: User;
  updateVariationResource: VariationResource;
  verifyOTP: VerifiedCodeResponse;
};


export type MutationCreateCrewLogArgs = {
  createCrewLogInput: CreateCrewLogInput;
};


export type MutationCreateJobArgs = {
  createJobInput: CreateJobInput;
};


export type MutationCreateJobAttachmentsArgs = {
  createJobAttachmentInput: CreateJobAttachmentsInput;
};


export type MutationCreateJobRecordArgs = {
  createJobRecordInput: CreateJobRecordInput;
};


export type MutationCreateJobScopeItemArgs = {
  createJobScopeItemInput: CreateJobScopeItemInput;
};


export type MutationCreateOrganisationArgs = {
  createOrganisationInput: CreateOrganisationInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationCreateVariationInitialDataArgs = {
  createVariationInitialDataInput: CreateVariationInitialDataInput;
};


export type MutationCreateVariationResourceArgs = {
  createVariationResourceInput: CreateVariationResourceInput;
};


export type MutationDeleteJobArgs = {
  id: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  loginUserInput: LoginInput;
};


export type MutationRemoveCrewLogArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveJobAttachmentArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveJobScopeItemArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveOrganisationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveVariationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveVariationResourceArgs = {
  id: Scalars['String']['input'];
};


export type MutationRequestVerificationCodeArgs = {
  email: Scalars['String']['input'];
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationSignupArgs = {
  signupInput: SignUpInput;
};


export type MutationUpdateCrewLogArgs = {
  updateCrewLogInput: UpdateCrewLogInput;
};


export type MutationUpdateJobArgs = {
  updateJobInput: UpdateJobInput;
};


export type MutationUpdateJobRecordArgs = {
  updateJobRecordInput: UpdateJobRecordInput;
};


export type MutationUpdateJobScopeItemArgs = {
  updateJobScopeItemInput: UpdateJobScopeItemInput;
};


export type MutationUpdateOrganisationArgs = {
  updateOrganisationInput: UpdateOrganisationInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationUpdateVariationResourceArgs = {
  updateVariationResourceInput: UpdateVariationResourceInput;
};


export type MutationVerifyOtpArgs = {
  input: VerifyCodeInput;
};

export type Organisation = {
  __typename?: 'Organisation';
  id: Scalars['String']['output'];
  logoUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  crewLog: CrewLog;
  currentUser: User;
  job: Job;
  jobAttachment: JobAttachment;
  jobAttachments: Array<JobAttachment>;
  jobCrew: Array<JobCrewMember>;
  jobRecord: JobRecord;
  jobScopeItems: Array<JobScopeItem>;
  organisation: Organisation;
  presignedUrl: Scalars['String']['output'];
  searchJobRecords: Array<JobRecord>;
  searchJobs: Array<Job>;
  searchUsers: Array<User>;
  user: User;
  variationResource: VariationResource;
  variationResourceSummary: VariationResourceSummary;
  variationResources: Array<VariationResource>;
};


export type QueryCrewLogArgs = {
  id: Scalars['Int']['input'];
};


export type QueryJobArgs = {
  id: Scalars['String']['input'];
};


export type QueryJobAttachmentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryJobAttachmentsArgs = {
  jobId: Scalars['String']['input'];
};


export type QueryJobCrewArgs = {
  jobId: Scalars['String']['input'];
};


export type QueryJobRecordArgs = {
  id: Scalars['String']['input'];
};


export type QueryJobScopeItemsArgs = {
  jobId: Scalars['String']['input'];
};


export type QueryOrganisationArgs = {
  id: Scalars['String']['input'];
};


export type QueryPresignedUrlArgs = {
  key: Scalars['String']['input'];
};


export type QuerySearchJobRecordsArgs = {
  jobRecordSearchInput: JobRecordSearchInput;
};


export type QuerySearchJobsArgs = {
  jobSearchInput: JobSearchInput;
};


export type QuerySearchUsersArgs = {
  userSearchInput: SearchUserInput;
};


export type QueryUserArgs = {
  id: Scalars['String']['input'];
};


export type QueryVariationResourceArgs = {
  id: Scalars['String']['input'];
};


export type QueryVariationResourceSummaryArgs = {
  variationId: Scalars['String']['input'];
};


export type QueryVariationResourcesArgs = {
  variationId: Scalars['String']['input'];
};

export type ResetPasswordInput = {
  password: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type SearchUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organisationId?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type SignUpInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  organisationName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type UpdateCrewLogInput = {
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['String']['input'];
  imageUrls?: InputMaybe<Array<Scalars['String']['input']>>;
  jobId?: InputMaybe<Scalars['String']['input']>;
  jobScopeItemId?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateJobInput = {
  crew?: InputMaybe<Array<Scalars['String']['input']>>;
  customerName?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['String']['input'];
  scopeItems?: InputMaybe<Array<CreateJobScopeItemViaJobInput>>;
  status?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateJobRecordInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  equipment?: InputMaybe<Scalars['String']['input']>;
  flag?: InputMaybe<Scalars['String']['input']>;
  hours?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  imageUrls?: InputMaybe<Array<Scalars['String']['input']>>;
  jobId?: InputMaybe<Scalars['String']['input']>;
  materials?: InputMaybe<Scalars['String']['input']>;
  numPeople?: InputMaybe<Scalars['String']['input']>;
  scopeRef?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  who?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateJobScopeItemInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  jobId?: InputMaybe<Scalars['String']['input']>;
  reference?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOrganisationInput = {
  id: Scalars['String']['input'];
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateVariationResourceInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  hours?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  jobRecordId?: InputMaybe<Scalars['String']['input']>;
  numPeople?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['String']['input']>;
  rate?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  unit?: InputMaybe<Scalars['String']['input']>;
  unitPrice?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  organisation: Organisation;
  organisationId: Scalars['String']['output'];
  password: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  role: Scalars['String']['output'];
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type UserAuth = {
  __typename?: 'UserAuth';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  orgId: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export type VariationInitialData = {
  __typename?: 'VariationInitialData';
  equipment?: Maybe<Scalars['String']['output']>;
  hours?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  materials?: Maybe<Scalars['String']['output']>;
  numPeople?: Maybe<Scalars['String']['output']>;
  variationId: Scalars['String']['output'];
  who?: Maybe<Scalars['String']['output']>;
};

export type VariationResource = {
  __typename?: 'VariationResource';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  hours?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  jobRecordId: Scalars['String']['output'];
  numPeople?: Maybe<Scalars['String']['output']>;
  quantity?: Maybe<Scalars['String']['output']>;
  rate?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  unit?: Maybe<Scalars['String']['output']>;
  unitPrice?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type VariationResourceSummary = {
  __typename?: 'VariationResourceSummary';
  equipmentTotal: Scalars['String']['output'];
  labourTotal: Scalars['String']['output'];
  materialTotal: Scalars['String']['output'];
  otherTotal: Scalars['String']['output'];
  total: Scalars['String']['output'];
  variationId: Scalars['String']['output'];
};

export type VerificationTokenResponse = {
  __typename?: 'VerificationTokenResponse';
  email: Scalars['String']['output'];
  msg: Scalars['String']['output'];
  phone: Scalars['String']['output'];
};

export type VerifiedCodeResponse = {
  __typename?: 'VerifiedCodeResponse';
  reset_password_token: Scalars['String']['output'];
};

export type VerifyCodeInput = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export type PreSignedUrlQueryVariables = Exact<{
  key: Scalars['String']['input'];
}>;


export type PreSignedUrlQuery = { __typename?: 'Query', presignedUrl: string };

export type LoginMutationMobileMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutationMobileMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', access_token: string, refresh_token: string, user: { __typename?: 'UserAuth', id: string } } };

export type SettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', name: string, email: string, role: string, phone?: string | null, organisation: { __typename?: 'Organisation', name: string } } };

export type JobCellQueryVariables = Exact<{
  jobId: Scalars['String']['input'];
}>;


export type JobCellQuery = { __typename?: 'Query', job: { __typename?: 'Job', id: string, title: string, description?: string | null, status?: string | null, customerName?: string | null, dueDate?: any | null, variations?: Array<{ __typename?: 'JobRecord', id: string, title: string, description?: string | null }> | null, attachments: Array<{ __typename?: 'JobAttachment', id: string, name: string, url: string }> } };

export type VariationCellQueryVariables = Exact<{
  variationId: Scalars['String']['input'];
}>;


export type VariationCellQuery = { __typename?: 'Query', jobRecord: { __typename?: 'JobRecord', id: string, title: string, description?: string | null, job: { __typename?: 'Job', title: string, customerName?: string | null }, submittedBy: { __typename?: 'User', name: string }, initialData?: { __typename?: 'VariationInitialData', hours?: string | null, numPeople?: string | null, who?: string | null, materials?: string | null, equipment?: string | null } | null, images: Array<{ __typename?: 'JobRecordImage', id: string, url: string }>, scopeItem?: { __typename?: 'JobScopeItem', title?: string | null, reference?: string | null, description?: string | null } | null } };

export type JobSelectQueryVariables = Exact<{
  input: JobSearchInput;
}>;


export type JobSelectQuery = { __typename?: 'Query', searchJobs: Array<{ __typename?: 'Job', id: string, title: string }> };

export type GetOtpMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type GetOtpMutation = { __typename?: 'Mutation', requestVerificationCode: { __typename?: 'VerificationTokenResponse', msg: string, phone: string, email: string } };

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'LoginResponse', access_token: string } };

export type VerifyOtpMutationVariables = Exact<{
  input: VerifyCodeInput;
}>;


export type VerifyOtpMutation = { __typename?: 'Mutation', verifyOTP: { __typename?: 'VerifiedCodeResponse', reset_password_token: string } };

export type GetScopeItemsQueryVariables = Exact<{
  jobId: Scalars['String']['input'];
}>;


export type GetScopeItemsQuery = { __typename?: 'Query', jobScopeItems: Array<{ __typename?: 'JobScopeItem', id: string, title?: string | null, reference?: string | null, description?: string | null }> };

export type JobsCellQueryVariables = Exact<{
  input: JobSearchInput;
}>;


export type JobsCellQuery = { __typename?: 'Query', searchJobs: Array<{ __typename?: 'Job', id: string, title: string, customerName?: string | null, status?: string | null, dueDate?: any | null, description?: string | null }> };

export type VariationsCellQueryVariables = Exact<{
  input: JobRecordSearchInput;
}>;


export type VariationsCellQuery = { __typename?: 'Query', searchJobRecords: Array<{ __typename?: 'JobRecord', id: string, title: string, description?: string | null, type: string, job: { __typename?: 'Job', title: string }, submittedBy: { __typename?: 'User', name: string } }> };

export type CreateCrewLogMutationVariables = Exact<{
  input: CreateCrewLogInput;
}>;


export type CreateCrewLogMutation = { __typename?: 'Mutation', createCrewLog: { __typename?: 'CrewLog', id: string } };

export type UpdateCrewLogMutationVariables = Exact<{
  input: UpdateCrewLogInput;
}>;


export type UpdateCrewLogMutation = { __typename?: 'Mutation', updateCrewLog: { __typename?: 'CrewLog', id: string } };

export type CreateJobRecordMutationVariables = Exact<{
  input: CreateJobRecordInput;
}>;


export type CreateJobRecordMutation = { __typename?: 'Mutation', createJobRecord: { __typename?: 'JobRecord', id: string } };

export type UpdateJobRecordMutationVariables = Exact<{
  input: UpdateJobRecordInput;
}>;


export type UpdateJobRecordMutation = { __typename?: 'Mutation', updateJobRecord: { __typename?: 'JobRecord', id: string } };

export type CreateVariationInitialDataMutationVariables = Exact<{
  input: CreateVariationInitialDataInput;
}>;


export type CreateVariationInitialDataMutation = { __typename?: 'Mutation', createVariationInitialData: { __typename?: 'VariationInitialData', id: string } };

export type CreateOrgUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateOrgUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, name: string, phone?: string | null, email: string } };

export type PreSignedUrlWebQueryVariables = Exact<{
  key: Scalars['String']['input'];
}>;


export type PreSignedUrlWebQuery = { __typename?: 'Query', presignedUrl: string };

export type AdminPageTableSectionQueryVariables = Exact<{
  input: SearchUserInput;
}>;


export type AdminPageTableSectionQuery = { __typename?: 'Query', searchUsers: Array<{ __typename?: 'User', id: string, name: string, phone?: string | null, role: string }> };

export type CrewPageTableSectionQueryVariables = Exact<{
  input: SearchUserInput;
}>;


export type CrewPageTableSectionQuery = { __typename?: 'Query', searchUsers: Array<{ __typename?: 'User', id: string, name: string, phone?: string | null, role: string }> };

export type CreateJobAttachmentsMutationVariables = Exact<{
  input: CreateJobAttachmentsInput;
}>;


export type CreateJobAttachmentsMutation = { __typename?: 'Mutation', createJobAttachments: Array<{ __typename?: 'JobAttachment', id: string, jobId: string, url: string }> };

export type JobAttachmentsQueryVariables = Exact<{
  jobId: Scalars['String']['input'];
}>;


export type JobAttachmentsQuery = { __typename?: 'Query', jobAttachments: Array<{ __typename?: 'JobAttachment', id: string, url: string, name: string, type: string }> };

export type DeleteJobAttachmentMutationVariables = Exact<{
  input: Scalars['String']['input'];
}>;


export type DeleteJobAttachmentMutation = { __typename?: 'Mutation', removeJobAttachment: boolean };

export type JobCrewQueryVariables = Exact<{
  jobId: Scalars['String']['input'];
}>;


export type JobCrewQuery = { __typename?: 'Query', jobCrew: Array<{ __typename?: 'JobCrewMember', id: string, name: string, phone: string, role: string }> };

export type JobDetailsQueryVariables = Exact<{
  jobId: Scalars['String']['input'];
}>;


export type JobDetailsQuery = { __typename?: 'Query', job: { __typename?: 'Job', id: string, title: string, description?: string | null, ownerId: string, status?: string | null, customerName?: string | null, createdAt?: any | null, dueDate?: any | null } };

export type DeleteJobMutationVariables = Exact<{
  input: Scalars['String']['input'];
}>;


export type DeleteJobMutation = { __typename?: 'Mutation', deleteJob: boolean };

export type JobScopeItemsQueryVariables = Exact<{
  input: Scalars['String']['input'];
}>;


export type JobScopeItemsQuery = { __typename?: 'Query', jobScopeItems: Array<{ __typename?: 'JobScopeItem', id: string, reference?: string | null, title?: string | null }> };

export type UserOrgExportQueryVariables = Exact<{ [key: string]: never; }>;


export type UserOrgExportQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', id: string, organisation: { __typename?: 'Organisation', id: string, name: string, logoUrl?: string | null } } };

export type UserAccountQueryVariables = Exact<{ [key: string]: never; }>;


export type UserAccountQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', id: string, name: string, email: string, phone?: string | null, role: string, organisation: { __typename?: 'Organisation', id: string, name: string } } };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, name: string, email: string, phone?: string | null } };

export type UserOrgSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserOrgSettingsQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', id: string, organisation: { __typename?: 'Organisation', id: string, name: string, logoUrl?: string | null } } };

export type UpdateOrganisationMutationVariables = Exact<{
  input: UpdateOrganisationInput;
}>;


export type UpdateOrganisationMutation = { __typename?: 'Mutation', updateOrganisation: { __typename?: 'Organisation', id: string, name: string, logoUrl?: string | null } };

export type UserQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name: string, email: string, phone?: string | null, role: string, organisation: { __typename?: 'Organisation', id: string, name: string } } };

export type LoginMutationMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutationMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', access_token: string } };

export type SignUpMutationMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpMutationMutation = { __typename?: 'Mutation', signup: { __typename?: 'LoginResponse', access_token: string } };

export type CreateJobScopeItemMutationVariables = Exact<{
  input: CreateJobScopeItemInput;
}>;


export type CreateJobScopeItemMutation = { __typename?: 'Mutation', createJobScopeItem: { __typename?: 'JobScopeItem', id: string, jobId: string, title?: string | null, description?: string | null, reference?: string | null } };

export type UpdateJobScopeItemMutationVariables = Exact<{
  input: UpdateJobScopeItemInput;
}>;


export type UpdateJobScopeItemMutation = { __typename?: 'Mutation', updateJobScopeItem: { __typename?: 'JobScopeItem', id: string, jobId: string, title?: string | null, description?: string | null, reference?: string | null } };

export type DeleteJobScopeItemMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteJobScopeItemMutation = { __typename?: 'Mutation', removeJobScopeItem: { __typename?: 'JobScopeItem', id: string, jobId: string, title?: string | null, description?: string | null, reference?: string | null } };

export type GetJobScopeItemsQueryVariables = Exact<{
  jobId: Scalars['String']['input'];
}>;


export type GetJobScopeItemsQuery = { __typename?: 'Query', jobScopeItems: Array<{ __typename?: 'JobScopeItem', id: string, jobId: string, title?: string | null, description?: string | null, reference?: string | null }> };

export type CreateJobMutationMutationVariables = Exact<{
  input: CreateJobInput;
}>;


export type CreateJobMutationMutation = { __typename?: 'Mutation', createJob: { __typename?: 'Job', id: string, title: string } };

export type UpdateJobMutationVariables = Exact<{
  input: UpdateJobInput;
}>;


export type UpdateJobMutation = { __typename?: 'Mutation', updateJob: { __typename?: 'Job', id: string } };

export type DashboardSearchJobsQueryVariables = Exact<{
  input: JobSearchInput;
}>;


export type DashboardSearchJobsQuery = { __typename?: 'Query', searchJobs: Array<{ __typename?: 'Job', id: string, title: string, customerName?: string | null, status?: string | null, dueDate?: any | null, description?: string | null }> };

export type JobsTableSearchJobsQueryVariables = Exact<{
  input: JobSearchInput;
}>;


export type JobsTableSearchJobsQuery = { __typename?: 'Query', searchJobs: Array<{ __typename?: 'Job', id: string, title: string, status?: string | null, customerName?: string | null, dueDate?: any | null, variations?: Array<{ __typename?: 'JobRecord', id: string, type: string, flag?: string | null }> | null }> };

export type JobWithCrewQueryVariables = Exact<{
  jobId: Scalars['String']['input'];
}>;


export type JobWithCrewQuery = { __typename?: 'Query', job: { __typename?: 'Job', id: string, title: string, description?: string | null, ownerId: string, status?: string | null, customerName?: string | null, createdAt?: any | null, dueDate?: any | null }, jobCrew: Array<{ __typename?: 'JobCrewMember', id: string, name: string }> };

export type JobPageQueryVariables = Exact<{
  jobId: Scalars['String']['input'];
}>;


export type JobPageQuery = { __typename?: 'Query', job: { __typename?: 'Job', id: string, title: string } };

export type CreateVariationResourceMutationVariables = Exact<{
  input: CreateVariationResourceInput;
}>;


export type CreateVariationResourceMutation = { __typename?: 'Mutation', createVariationResource: { __typename?: 'VariationResource', id: string, jobRecordId: string, createdAt: any } };

export type UpdateVariationResourceMutationVariables = Exact<{
  input: UpdateVariationResourceInput;
}>;


export type UpdateVariationResourceMutation = { __typename?: 'Mutation', updateVariationResource: { __typename?: 'VariationResource', id: string, jobRecordId: string } };

export type VariationResourcesQueryVariables = Exact<{
  variationId: Scalars['String']['input'];
}>;


export type VariationResourcesQuery = { __typename?: 'Query', variationResources: Array<{ __typename?: 'VariationResource', id: string, description?: string | null, type: string, quantity?: string | null, unit?: string | null, unitPrice?: string | null, hours?: string | null, rate?: string | null, numPeople?: string | null, createdAt: any }> };

export type DeleteVariationResourceMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteVariationResourceMutation = { __typename?: 'Mutation', removeVariationResource: { __typename?: 'VariationResource', id: string } };

export type ResourceSummaryQueryVariables = Exact<{
  variationId: Scalars['String']['input'];
}>;


export type ResourceSummaryQuery = { __typename?: 'Query', variationResourceSummary: { __typename?: 'VariationResourceSummary', labourTotal: string, materialTotal: string, equipmentTotal: string, otherTotal: string, total: string } };

export type VariationTableSearchVariationsQueryVariables = Exact<{
  input: JobRecordSearchInput;
}>;


export type VariationTableSearchVariationsQuery = { __typename?: 'Query', searchJobRecords: Array<{ __typename?: 'JobRecord', id: string, title: string, description?: string | null, createdAt: any, status?: string | null, type: string, flag?: string | null, initialData?: { __typename?: 'VariationInitialData', id: string, numPeople?: string | null, hours?: string | null, materials?: string | null, equipment?: string | null } | null, job: { __typename?: 'Job', title: string }, submittedBy: { __typename?: 'User', name: string } }> };

export type DashboardSearchVariationsQueryVariables = Exact<{
  input: JobRecordSearchInput;
}>;


export type DashboardSearchVariationsQuery = { __typename?: 'Query', searchJobRecords: Array<{ __typename?: 'JobRecord', id: string, title: string, description?: string | null, status?: string | null, flag?: string | null, type: string, job: { __typename?: 'Job', title: string }, submittedBy: { __typename?: 'User', name: string } }> };

export type VariationQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type VariationQuery = { __typename?: 'Query', jobRecord: { __typename?: 'JobRecord', id: string, title: string, description?: string | null, status?: string | null, type: string, flag?: string | null, createdAt: any, initialData?: { __typename?: 'VariationInitialData', id: string, numPeople?: string | null, hours?: string | null, materials?: string | null, equipment?: string | null, who?: string | null } | null, job: { __typename?: 'Job', id: string, title: string, customerName?: string | null }, submittedBy: { __typename?: 'User', name: string }, images: Array<{ __typename?: 'JobRecordImage', id: string, url: string }> } };


export const PreSignedUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PreSignedUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"presignedUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key"}}}]}]}}]} as unknown as DocumentNode<PreSignedUrlQuery, PreSignedUrlQueryVariables>;
export const LoginMutationMobileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginMutationMobile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}},{"kind":"Field","name":{"kind":"Name","value":"refresh_token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutationMobileMutation, LoginMutationMobileMutationVariables>;
export const SettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"organisation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<SettingsQuery, SettingsQueryVariables>;
export const JobCellDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JobCell"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"job"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"variations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attachments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<JobCellQuery, JobCellQueryVariables>;
export const VariationCellDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VariationCell"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"variationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jobRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"variationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"submittedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"initialData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"numPeople"}},{"kind":"Field","name":{"kind":"Name","value":"who"}},{"kind":"Field","name":{"kind":"Name","value":"materials"}},{"kind":"Field","name":{"kind":"Name","value":"equipment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scopeItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"reference"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<VariationCellQuery, VariationCellQueryVariables>;
export const JobSelectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JobSelect"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JobSearchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchJobs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"jobSearchInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<JobSelectQuery, JobSelectQueryVariables>;
export const GetOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GetOTP"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestVerificationCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<GetOtpMutation, GetOtpMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResetPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}}]}}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const VerifyOtpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyOTP"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VerifyCodeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyOTP"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reset_password_token"}}]}}]}}]} as unknown as DocumentNode<VerifyOtpMutation, VerifyOtpMutationVariables>;
export const GetScopeItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetScopeItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jobScopeItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"jobId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"reference"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetScopeItemsQuery, GetScopeItemsQueryVariables>;
export const JobsCellDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JobsCell"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JobSearchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchJobs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"jobSearchInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<JobsCellQuery, JobsCellQueryVariables>;
export const VariationsCellDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VariationsCell"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JobRecordSearchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchJobRecords"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"jobRecordSearchInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"submittedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<VariationsCellQuery, VariationsCellQueryVariables>;
export const CreateCrewLogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCrewLog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCrewLogInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCrewLog"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createCrewLogInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateCrewLogMutation, CreateCrewLogMutationVariables>;
export const UpdateCrewLogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCrewLog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCrewLogInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCrewLog"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateCrewLogInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateCrewLogMutation, UpdateCrewLogMutationVariables>;
export const CreateJobRecordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateJobRecord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateJobRecordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createJobRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createJobRecordInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateJobRecordMutation, CreateJobRecordMutationVariables>;
export const UpdateJobRecordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateJobRecord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateJobRecordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateJobRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateJobRecordInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateJobRecordMutation, UpdateJobRecordMutationVariables>;
export const CreateVariationInitialDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateVariationInitialData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateVariationInitialDataInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createVariationInitialData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createVariationInitialDataInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateVariationInitialDataMutation, CreateVariationInitialDataMutationVariables>;
export const CreateOrgUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrgUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<CreateOrgUserMutation, CreateOrgUserMutationVariables>;
export const PreSignedUrlWebDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PreSignedUrlWeb"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"presignedUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key"}}}]}]}}]} as unknown as DocumentNode<PreSignedUrlWebQuery, PreSignedUrlWebQueryVariables>;
export const AdminPageTableSectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AdminPageTableSection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userSearchInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<AdminPageTableSectionQuery, AdminPageTableSectionQueryVariables>;
export const CrewPageTableSectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CrewPageTableSection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userSearchInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<CrewPageTableSectionQuery, CrewPageTableSectionQueryVariables>;
export const CreateJobAttachmentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateJobAttachments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateJobAttachmentsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createJobAttachments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createJobAttachmentInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"jobId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<CreateJobAttachmentsMutation, CreateJobAttachmentsMutationVariables>;
export const JobAttachmentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JobAttachments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jobAttachments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"jobId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<JobAttachmentsQuery, JobAttachmentsQueryVariables>;
export const DeleteJobAttachmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteJobAttachment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeJobAttachment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<DeleteJobAttachmentMutation, DeleteJobAttachmentMutationVariables>;
export const JobCrewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JobCrew"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jobCrew"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"jobId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]} as unknown as DocumentNode<JobCrewQuery, JobCrewQueryVariables>;
export const JobDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JobDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"job"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}}]}}]}}]} as unknown as DocumentNode<JobDetailsQuery, JobDetailsQueryVariables>;
export const DeleteJobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteJob"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteJob"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<DeleteJobMutation, DeleteJobMutationVariables>;
export const JobScopeItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JobScopeItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jobScopeItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"jobId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"reference"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<JobScopeItemsQuery, JobScopeItemsQueryVariables>;
export const UserOrgExportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserOrgExport"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"organisation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}}]}}]}}]}}]} as unknown as DocumentNode<UserOrgExportQuery, UserOrgExportQueryVariables>;
export const UserAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"organisation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<UserAccountQuery, UserAccountQueryVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const UserOrgSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserOrgSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"organisation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}}]}}]}}]}}]} as unknown as DocumentNode<UserOrgSettingsQuery, UserOrgSettingsQueryVariables>;
export const UpdateOrganisationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOrganisation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateOrganisationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOrganisation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateOrganisationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}}]}}]}}]} as unknown as DocumentNode<UpdateOrganisationMutation, UpdateOrganisationMutationVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"User"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"organisation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const LoginMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"loginUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}}]}}]}}]} as unknown as DocumentNode<LoginMutationMutation, LoginMutationMutationVariables>;
export const SignUpMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SignUpMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignUpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"signupInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"access_token"}}]}}]}}]} as unknown as DocumentNode<SignUpMutationMutation, SignUpMutationMutationVariables>;
export const CreateJobScopeItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createJobScopeItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateJobScopeItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createJobScopeItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createJobScopeItemInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"jobId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"reference"}}]}}]}}]} as unknown as DocumentNode<CreateJobScopeItemMutation, CreateJobScopeItemMutationVariables>;
export const UpdateJobScopeItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateJobScopeItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateJobScopeItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateJobScopeItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateJobScopeItemInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"jobId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"reference"}}]}}]}}]} as unknown as DocumentNode<UpdateJobScopeItemMutation, UpdateJobScopeItemMutationVariables>;
export const DeleteJobScopeItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteJobScopeItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeJobScopeItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"jobId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"reference"}}]}}]}}]} as unknown as DocumentNode<DeleteJobScopeItemMutation, DeleteJobScopeItemMutationVariables>;
export const GetJobScopeItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getJobScopeItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jobScopeItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"jobId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"jobId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"reference"}}]}}]}}]} as unknown as DocumentNode<GetJobScopeItemsQuery, GetJobScopeItemsQueryVariables>;
export const CreateJobMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateJobMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateJobInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createJob"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createJobInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<CreateJobMutationMutation, CreateJobMutationMutationVariables>;
export const UpdateJobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateJob"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateJobInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateJob"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateJobInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateJobMutation, UpdateJobMutationVariables>;
export const DashboardSearchJobsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DashboardSearchJobs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JobSearchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchJobs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"jobSearchInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<DashboardSearchJobsQuery, DashboardSearchJobsQueryVariables>;
export const JobsTableSearchJobsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JobsTableSearchJobs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JobSearchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchJobs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"jobSearchInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"variations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"flag"}}]}}]}}]}}]} as unknown as DocumentNode<JobsTableSearchJobsQuery, JobsTableSearchJobsQueryVariables>;
export const JobWithCrewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JobWithCrew"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"job"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"jobCrew"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"jobId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<JobWithCrewQuery, JobWithCrewQueryVariables>;
export const JobPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JobPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"job"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<JobPageQuery, JobPageQueryVariables>;
export const CreateVariationResourceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateVariationResource"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateVariationResourceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createVariationResource"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createVariationResourceInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"jobRecordId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateVariationResourceMutation, CreateVariationResourceMutationVariables>;
export const UpdateVariationResourceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateVariationResource"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateVariationResourceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateVariationResource"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateVariationResourceInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"jobRecordId"}}]}}]}}]} as unknown as DocumentNode<UpdateVariationResourceMutation, UpdateVariationResourceMutationVariables>;
export const VariationResourcesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VariationResources"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"variationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"variationResources"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"variationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"variationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"unitPrice"}},{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}},{"kind":"Field","name":{"kind":"Name","value":"numPeople"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<VariationResourcesQuery, VariationResourcesQueryVariables>;
export const DeleteVariationResourceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteVariationResource"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeVariationResource"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteVariationResourceMutation, DeleteVariationResourceMutationVariables>;
export const ResourceSummaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ResourceSummary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"variationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"variationResourceSummary"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"variationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"variationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"labourTotal"}},{"kind":"Field","name":{"kind":"Name","value":"materialTotal"}},{"kind":"Field","name":{"kind":"Name","value":"equipmentTotal"}},{"kind":"Field","name":{"kind":"Name","value":"otherTotal"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<ResourceSummaryQuery, ResourceSummaryQueryVariables>;
export const VariationTableSearchVariationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VariationTableSearchVariations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JobRecordSearchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchJobRecords"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"jobRecordSearchInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"flag"}},{"kind":"Field","name":{"kind":"Name","value":"initialData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"numPeople"}},{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"materials"}},{"kind":"Field","name":{"kind":"Name","value":"equipment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"submittedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<VariationTableSearchVariationsQuery, VariationTableSearchVariationsQueryVariables>;
export const DashboardSearchVariationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DashboardSearchVariations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JobRecordSearchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchJobRecords"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"jobRecordSearchInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"flag"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"submittedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<DashboardSearchVariationsQuery, DashboardSearchVariationsQueryVariables>;
export const VariationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Variation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jobRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"flag"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"initialData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"numPeople"}},{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"materials"}},{"kind":"Field","name":{"kind":"Name","value":"equipment"}},{"kind":"Field","name":{"kind":"Name","value":"who"}}]}},{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"submittedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<VariationQuery, VariationQueryVariables>;
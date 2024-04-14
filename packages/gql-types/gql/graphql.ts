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
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any; }
};

export type Attachment = {
  __typename?: 'Attachment';
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  referenceId: Scalars['String']['output'];
  referenceType: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type AttachmentsInput = {
  name: Scalars['String']['input'];
  type: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type CreateAttachmentsInput = {
  attachments: Array<AttachmentsInput>;
  referenceId: Scalars['String']['input'];
  referenceType: Scalars['String']['input'];
};

export type CreateCrewLogInput = {
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  jobId: Scalars['String']['input'];
  jobScopeItemId?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateFormTemplateInput = {
  category: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateJobFormInput = {
  formTemplateId: Scalars['String']['input'];
  jobId: Scalars['String']['input'];
};

export type CreateJobFormResponseInput = {
  jobFormId: Scalars['String']['input'];
  jobRecordId: Scalars['String']['input'];
  response: Scalars['JSON']['input'];
};

export type CreateJobInput = {
  crew?: InputMaybe<Array<Scalars['String']['input']>>;
  customerName?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  projectId?: InputMaybe<Scalars['String']['input']>;
  scopeItems?: InputMaybe<Array<CreateJobScopeItemViaJobInput>>;
  status?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateJobRecordInput = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  formContent?: InputMaybe<Scalars['JSON']['input']>;
  formId?: InputMaybe<Scalars['String']['input']>;
  imageUrls?: InputMaybe<Array<Scalars['String']['input']>>;
  jobId: Scalars['String']['input'];
  scopeRef?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateJobScopeItemInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
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
  authId: Scalars['String']['input'];
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateProjectInput = {
  customer: Scalars['String']['input'];
  description: Scalars['String']['input'];
  status: Scalars['String']['input'];
  title: Scalars['String']['input'];
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

export type FormTemplate = {
  __typename?: 'FormTemplate';
  autoAssign?: Maybe<Scalars['Boolean']['output']>;
  category: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isSystemDefault?: Maybe<Scalars['Boolean']['output']>;
  name: Scalars['String']['output'];
  organizationId?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  structure?: Maybe<Scalars['JSONObject']['output']>;
};

export type InviteUserInput = {
  email: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type Job = {
  __typename?: 'Job';
  attachments: Array<Attachment>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  customerName?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  jobForms?: Maybe<Array<FormTemplate>>;
  organisationId?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['String']['output']>;
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['String']['output']>;
  scopeItems?: Maybe<Array<JobScopeItem>>;
  status?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  variations?: Maybe<Array<JobRecord>>;
};

export type JobCrewMember = {
  __typename?: 'JobCrewMember';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  userOrganisation?: Maybe<UserOrganisation>;
};

export type JobForm = {
  __typename?: 'JobForm';
  formTemplate: FormTemplate;
  formTemplateId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  jobId: Scalars['String']['output'];
};

export type JobFormResponse = {
  __typename?: 'JobFormResponse';
  id: Scalars['String']['output'];
  jobFormId: Scalars['String']['output'];
  jobRecordId: Scalars['String']['output'];
  response?: Maybe<Scalars['JSON']['output']>;
};

export type JobRecord = {
  __typename?: 'JobRecord';
  archived?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  flag?: Maybe<Scalars['String']['output']>;
  formResponse?: Maybe<JobFormResponse>;
  id: Scalars['String']['output'];
  images: Array<JobRecordImage>;
  initialData?: Maybe<VariationInitialData>;
  job: Job;
  jobForm?: Maybe<JobForm>;
  jobFormId?: Maybe<Scalars['String']['output']>;
  jobId: Scalars['String']['output'];
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
  archivedOnly?: InputMaybe<Scalars['Boolean']['input']>;
  formCategory?: InputMaybe<Scalars['String']['input']>;
  formId?: InputMaybe<Scalars['String']['input']>;
  jobId?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  submittedBy?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
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
  projectId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAttachments: Array<Attachment>;
  createCrewLog: CrewLog;
  createFormTemplate: FormTemplate;
  createJob: Job;
  createJobForm: JobForm;
  createJobFormResponse: JobFormResponse;
  createJobRecord: JobRecord;
  createJobScopeItem: JobScopeItem;
  createOrganisation: Organisation;
  createProject: Project;
  createVariationInitialData: VariationInitialData;
  createVariationResource: VariationResource;
  deleteJob: Scalars['Boolean']['output'];
  initialiseUser: User;
  inviteUser: Scalars['Boolean']['output'];
  removeCrewLog: CrewLog;
  removeJobAttachment: Scalars['Boolean']['output'];
  removeJobRecord: JobRecord;
  removeJobScopeItem: JobScopeItem;
  removeOrganisation: Organisation;
  removeProject: Project;
  removeUser: User;
  removeVariationResource: VariationResource;
  updateCrewLog: CrewLog;
  updateFormTemplate: FormTemplate;
  updateJob: Job;
  updateJobRecord: JobRecord;
  updateJobScopeItem: JobScopeItem;
  updateOrganisation: Organisation;
  updateProject: Project;
  updateUser: User;
  updateVariationResource: VariationResource;
};


export type MutationCreateAttachmentsArgs = {
  createAttachmentInput: CreateAttachmentsInput;
};


export type MutationCreateCrewLogArgs = {
  createCrewLogInput: CreateCrewLogInput;
};


export type MutationCreateFormTemplateArgs = {
  createFormTemplateInput: CreateFormTemplateInput;
};


export type MutationCreateJobArgs = {
  createJobInput: CreateJobInput;
};


export type MutationCreateJobFormArgs = {
  createJobFormInput: CreateJobFormInput;
};


export type MutationCreateJobFormResponseArgs = {
  createJobFormResponseInput: CreateJobFormResponseInput;
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


export type MutationCreateProjectArgs = {
  createProjectInput: CreateProjectInput;
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


export type MutationInviteUserArgs = {
  inviteInput: InviteUserInput;
};


export type MutationRemoveCrewLogArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveJobAttachmentArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveJobRecordArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveJobScopeItemArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveOrganisationArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveProjectArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveVariationResourceArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateCrewLogArgs = {
  updateCrewLogInput: UpdateCrewLogInput;
};


export type MutationUpdateFormTemplateArgs = {
  updateFormTemplateInput: UpdateFormTemplateInput;
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


export type MutationUpdateProjectArgs = {
  updateProjectInput: UpdateProjectInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationUpdateVariationResourceArgs = {
  updateVariationResourceInput: UpdateVariationResourceInput;
};

export type Organisation = {
  __typename?: 'Organisation';
  id: Scalars['String']['output'];
  logoUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type Project = {
  __typename?: 'Project';
  createdAt: Scalars['String']['output'];
  customer: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  jobs?: Maybe<Array<Job>>;
  organisationId: Scalars['String']['output'];
  status: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  attachments: Array<Attachment>;
  crewLog: CrewLog;
  currentUser: User;
  formTemplate: FormTemplate;
  formTemplates: Array<FormTemplate>;
  isUserInitialised: Scalars['Boolean']['output'];
  job: Job;
  jobAttachment: Attachment;
  jobCrew: Array<JobCrewMember>;
  jobForms: Array<JobForm>;
  jobRecord: JobRecord;
  jobScopeItems: Array<JobScopeItem>;
  organisation: Organisation;
  presignedUrl: Scalars['String']['output'];
  project: Project;
  projects: Array<Project>;
  searchFormTemplates: Array<FormTemplate>;
  searchJobRecords: Array<JobRecord>;
  searchJobs: Array<Job>;
  searchUsers: Array<User>;
  user: User;
  variationResource: VariationResource;
  variationResourceSummary: VariationResourceSummary;
  variationResources: Array<VariationResource>;
};


export type QueryAttachmentsArgs = {
  referenceId: Scalars['String']['input'];
};


export type QueryCrewLogArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFormTemplateArgs = {
  id: Scalars['String']['input'];
};


export type QueryJobArgs = {
  id: Scalars['String']['input'];
};


export type QueryJobAttachmentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryJobCrewArgs = {
  jobId: Scalars['String']['input'];
};


export type QueryJobFormsArgs = {
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


export type QueryProjectArgs = {
  id: Scalars['String']['input'];
};


export type QuerySearchFormTemplatesArgs = {
  formTemplateSearchInput: SearchFormTemplateInput;
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

export type SearchFormTemplateInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  jobId?: InputMaybe<Scalars['String']['input']>;
};

export type SearchUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organisationId?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Array<Scalars['String']['input']>>;
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

export type UpdateFormTemplateInput = {
  autoAssign?: InputMaybe<Scalars['Boolean']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  isSystemDefault?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  structure?: InputMaybe<Scalars['JSONObject']['input']>;
};

export type UpdateJobInput = {
  crew?: InputMaybe<Array<Scalars['String']['input']>>;
  customerName?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['String']['input'];
  projectId?: InputMaybe<Scalars['String']['input']>;
  scopeItems?: InputMaybe<Array<CreateJobScopeItemViaJobInput>>;
  status?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateJobRecordInput = {
  archived?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  formContent?: InputMaybe<Scalars['JSON']['input']>;
  formId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  imageUrls?: InputMaybe<Array<Scalars['String']['input']>>;
  jobId?: InputMaybe<Scalars['String']['input']>;
  scopeRef?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateJobScopeItemInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  jobId?: InputMaybe<Scalars['String']['input']>;
  reference?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOrganisationInput = {
  authId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  logoUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProjectInput = {
  customer?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  status?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  authId?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
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
  authId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  organisation?: Maybe<Organisation>;
  phone?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userOrganisation?: Maybe<UserOrganisation>;
};

export type UserOrganisation = {
  __typename?: 'UserOrganisation';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  organisation: Organisation;
  organisationId: Scalars['String']['output'];
  role: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
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

export type InitialiseUserMutationVariables = Exact<{ [key: string]: never; }>;


export type InitialiseUserMutation = { __typename?: 'Mutation', initialiseUser: { __typename?: 'User', id: string } };

export type PreSignedUrlQueryVariables = Exact<{
  key: Scalars['String']['input'];
}>;


export type PreSignedUrlQuery = { __typename?: 'Query', presignedUrl: string };

export type SettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingsQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', name: string, email: string, phone?: string | null, organisation?: { __typename?: 'Organisation', name: string } | null } };

export type JobCellQueryVariables = Exact<{
  jobId: Scalars['String']['input'];
}>;


export type JobCellQuery = { __typename?: 'Query', job: { __typename?: 'Job', id: string, title?: string | null, description?: string | null, status?: string | null, customerName?: string | null, dueDate?: any | null, variations?: Array<{ __typename?: 'JobRecord', id: string, title: string, description?: string | null }> | null, attachments: Array<{ __typename?: 'Attachment', id: string, name: string, url: string }> } };

export type JobFormSelectQueryVariables = Exact<{
  jobId: Scalars['String']['input'];
}>;


export type JobFormSelectQuery = { __typename?: 'Query', job: { __typename?: 'Job', jobForms?: Array<{ __typename?: 'FormTemplate', id: string, name: string, description?: string | null, category: string, status?: string | null, structure?: any | null }> | null } };

export type VariationCellQueryVariables = Exact<{
  variationId: Scalars['String']['input'];
}>;


export type VariationCellQuery = { __typename?: 'Query', jobRecord: { __typename?: 'JobRecord', id: string, title: string, description?: string | null, job: { __typename?: 'Job', title?: string | null, customerName?: string | null }, submittedBy: { __typename?: 'User', name: string }, initialData?: { __typename?: 'VariationInitialData', hours?: string | null, numPeople?: string | null, who?: string | null, materials?: string | null, equipment?: string | null } | null, images: Array<{ __typename?: 'JobRecordImage', id: string, url: string }>, scopeItem?: { __typename?: 'JobScopeItem', title?: string | null, reference?: string | null, description?: string | null } | null } };

export type JobSelectQueryVariables = Exact<{
  input: JobSearchInput;
}>;


export type JobSelectQuery = { __typename?: 'Query', searchJobs: Array<{ __typename?: 'Job', id: string, title?: string | null }> };

export type GetScopeItemsQueryVariables = Exact<{
  jobId: Scalars['String']['input'];
}>;


export type GetScopeItemsQuery = { __typename?: 'Query', jobScopeItems: Array<{ __typename?: 'JobScopeItem', id: string, title?: string | null, reference?: string | null, description?: string | null }> };

export type JobsCellQueryVariables = Exact<{
  input: JobSearchInput;
}>;


export type JobsCellQuery = { __typename?: 'Query', searchJobs: Array<{ __typename?: 'Job', id: string, title?: string | null, customerName?: string | null, status?: string | null, dueDate?: any | null, description?: string | null }> };

export type VariationsCellQueryVariables = Exact<{
  input: JobRecordSearchInput;
}>;


export type VariationsCellQuery = { __typename?: 'Query', searchJobRecords: Array<{ __typename?: 'JobRecord', id: string, title: string, description?: string | null, type: string, job: { __typename?: 'Job', title?: string | null }, submittedBy: { __typename?: 'User', name: string } }> };

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

export type JobFormsQueryVariables = Exact<{
  jobId: Scalars['String']['input'];
}>;


export type JobFormsQuery = { __typename?: 'Query', job: { __typename?: 'Job', jobForms?: Array<{ __typename?: 'FormTemplate', id: string, name: string, description?: string | null, category: string, status?: string | null }> | null } };

export type OrganisationFormSelectQueryVariables = Exact<{ [key: string]: never; }>;


export type OrganisationFormSelectQuery = { __typename?: 'Query', formTemplates: Array<{ __typename?: 'FormTemplate', id: string, name: string, category: string }> };

export type PreSignedUrlWebQueryVariables = Exact<{
  key: Scalars['String']['input'];
}>;


export type PreSignedUrlWebQuery = { __typename?: 'Query', presignedUrl: string };

export type CrewPageTableSectionQueryVariables = Exact<{
  input: SearchUserInput;
}>;


export type CrewPageTableSectionQuery = { __typename?: 'Query', searchUsers: Array<{ __typename?: 'User', id: string, name: string, userOrganisation?: { __typename?: 'UserOrganisation', role: string } | null }> };

export type CreateJobAttachmentsMutationVariables = Exact<{
  input: CreateAttachmentsInput;
}>;


export type CreateJobAttachmentsMutation = { __typename?: 'Mutation', createAttachments: Array<{ __typename?: 'Attachment', id: string, referenceId: string, url: string }> };

export type JobAttachmentsQueryVariables = Exact<{
  referenceId: Scalars['String']['input'];
}>;


export type JobAttachmentsQuery = { __typename?: 'Query', attachments: Array<{ __typename?: 'Attachment', id: string, url: string, name: string, type: string }> };

export type DeleteJobAttachmentMutationVariables = Exact<{
  input: Scalars['String']['input'];
}>;


export type DeleteJobAttachmentMutation = { __typename?: 'Mutation', removeJobAttachment: boolean };

export type JobCrewQueryVariables = Exact<{
  jobId: Scalars['String']['input'];
}>;


export type JobCrewQuery = { __typename?: 'Query', jobCrew: Array<{ __typename?: 'JobCrewMember', id: string, name: string, phone?: string | null, userOrganisation?: { __typename?: 'UserOrganisation', role: string } | null }> };

export type JobDetailsQueryVariables = Exact<{
  jobId: Scalars['String']['input'];
}>;


export type JobDetailsQuery = { __typename?: 'Query', job: { __typename?: 'Job', id: string, title?: string | null, description?: string | null, ownerId?: string | null, status?: string | null, customerName?: string | null, createdAt?: any | null, dueDate?: any | null, project?: { __typename?: 'Project', id: string, title: string } | null } };

export type DeleteJobMutationVariables = Exact<{
  input: Scalars['String']['input'];
}>;


export type DeleteJobMutation = { __typename?: 'Mutation', deleteJob: boolean };

export type JobScopeItemsQueryVariables = Exact<{
  input: Scalars['String']['input'];
}>;


export type JobScopeItemsQuery = { __typename?: 'Query', jobScopeItems: Array<{ __typename?: 'JobScopeItem', id: string, reference?: string | null, title?: string | null }> };

export type UserOrgExportQueryVariables = Exact<{ [key: string]: never; }>;


export type UserOrgExportQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', id: string, organisation?: { __typename?: 'Organisation', id: string, name: string, logoUrl?: string | null } | null } };

export type UserAccountQueryVariables = Exact<{ [key: string]: never; }>;


export type UserAccountQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', id: string, name: string, email: string, phone?: string | null, organisation?: { __typename?: 'Organisation', id: string, name: string } | null } };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, name: string, email: string, phone?: string | null } };

export type UserOrgSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserOrgSettingsQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', id: string, organisation?: { __typename?: 'Organisation', id: string, name: string, logoUrl?: string | null } | null } };

export type UpdateOrganisationMutationVariables = Exact<{
  input: UpdateOrganisationInput;
}>;


export type UpdateOrganisationMutation = { __typename?: 'Mutation', updateOrganisation: { __typename?: 'Organisation', id: string, name: string, logoUrl?: string | null } };

export type CreateFormTemplateMutationVariables = Exact<{
  input: CreateFormTemplateInput;
}>;


export type CreateFormTemplateMutation = { __typename?: 'Mutation', createFormTemplate: { __typename?: 'FormTemplate', id: string } };

export type UpdateFormTemplateMutationVariables = Exact<{
  input: UpdateFormTemplateInput;
}>;


export type UpdateFormTemplateMutation = { __typename?: 'Mutation', updateFormTemplate: { __typename?: 'FormTemplate', id: string } };

export type FindFormTemplateQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type FindFormTemplateQuery = { __typename?: 'Query', formTemplate: { __typename?: 'FormTemplate', id: string, name: string, description?: string | null, structure?: any | null, status?: string | null } };

export type FindAllFormTemplateQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllFormTemplateQuery = { __typename?: 'Query', formTemplates: Array<{ __typename?: 'FormTemplate', id: string, name: string, description?: string | null, category: string, status?: string | null, autoAssign?: boolean | null }> };

export type CreateJobFormMutationVariables = Exact<{
  input: CreateJobFormInput;
}>;


export type CreateJobFormMutation = { __typename?: 'Mutation', createJobForm: { __typename?: 'JobForm', id: string } };

export type DeleteJobRecordMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteJobRecordMutation = { __typename?: 'Mutation', removeJobRecord: { __typename?: 'JobRecord', id: string } };

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


export type CreateJobMutationMutation = { __typename?: 'Mutation', createJob: { __typename?: 'Job', id: string, title?: string | null } };

export type UpdateJobMutationVariables = Exact<{
  input: UpdateJobInput;
}>;


export type UpdateJobMutation = { __typename?: 'Mutation', updateJob: { __typename?: 'Job', id: string } };

export type DashboardSearchJobsQueryVariables = Exact<{
  input: JobSearchInput;
}>;


export type DashboardSearchJobsQuery = { __typename?: 'Query', searchJobs: Array<{ __typename?: 'Job', id: string, title?: string | null, customerName?: string | null, status?: string | null, dueDate?: any | null, description?: string | null }> };

export type JobsTableSearchJobsQueryVariables = Exact<{
  input: JobSearchInput;
}>;


export type JobsTableSearchJobsQuery = { __typename?: 'Query', searchJobs: Array<{ __typename?: 'Job', id: string, title?: string | null, status?: string | null, customerName?: string | null, dueDate?: any | null, variations?: Array<{ __typename?: 'JobRecord', id: string, type: string, flag?: string | null }> | null }> };

export type JobSelectSearchQueryVariables = Exact<{
  input: JobSearchInput;
}>;


export type JobSelectSearchQuery = { __typename?: 'Query', searchJobs: Array<{ __typename?: 'Job', id: string, title?: string | null }> };

export type JobWithCrewQueryVariables = Exact<{
  jobId: Scalars['String']['input'];
}>;


export type JobWithCrewQuery = { __typename?: 'Query', job: { __typename?: 'Job', id: string, title?: string | null, description?: string | null, ownerId?: string | null, status?: string | null, customerName?: string | null, createdAt?: any | null, dueDate?: any | null, projectId?: string | null }, jobCrew: Array<{ __typename?: 'JobCrewMember', id: string, name: string }> };

export type JobPageQueryVariables = Exact<{
  jobId: Scalars['String']['input'];
}>;


export type JobPageQuery = { __typename?: 'Query', job: { __typename?: 'Job', id: string, title?: string | null } };

export type CreateProjectMutationMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type CreateProjectMutationMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string, title: string } };

export type UpdateProjectMutationVariables = Exact<{
  input: UpdateProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'Project', id: string } };

export type FindAllProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: string, title: string, status: string, customer: string, description: string, jobs?: Array<{ __typename?: 'Job', id: string }> | null }> };

export type FindProjectQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type FindProjectQuery = { __typename?: 'Query', project: { __typename?: 'Project', id: string, title: string, customer: string, status: string, description: string } };

export type RemoveProjectMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveProjectMutation = { __typename?: 'Mutation', removeProject: { __typename?: 'Project', id: string } };

export type InviteUserMutationVariables = Exact<{
  input: InviteUserInput;
}>;


export type InviteUserMutation = { __typename?: 'Mutation', inviteUser: boolean };

export type IsUserInitialisedQueryVariables = Exact<{ [key: string]: never; }>;


export type IsUserInitialisedQuery = { __typename?: 'Query', isUserInitialised: boolean };

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

export type JobRecordTableSearchQueryVariables = Exact<{
  input: JobRecordSearchInput;
}>;


export type JobRecordTableSearchQuery = { __typename?: 'Query', searchJobRecords: Array<{ __typename?: 'JobRecord', id: string, title: string, description?: string | null, createdAt: any, status?: string | null, type: string, flag?: string | null, job: { __typename?: 'Job', title?: string | null }, jobForm?: { __typename?: 'JobForm', formTemplate: { __typename?: 'FormTemplate', id: string, name: string, category: string } } | null, submittedBy: { __typename?: 'User', name: string } }> };

export type DashboardSearchVariationsQueryVariables = Exact<{
  input: JobRecordSearchInput;
}>;


export type DashboardSearchVariationsQuery = { __typename?: 'Query', searchJobRecords: Array<{ __typename?: 'JobRecord', id: string, title: string, description?: string | null, status?: string | null, flag?: string | null, type: string, job: { __typename?: 'Job', title?: string | null }, submittedBy: { __typename?: 'User', name: string } }> };

export type JobRecordQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type JobRecordQuery = { __typename?: 'Query', jobRecord: { __typename?: 'JobRecord', id: string, title: string, description?: string | null, status?: string | null, type: string, flag?: string | null, createdAt: any, job: { __typename?: 'Job', id: string, title?: string | null, customerName?: string | null }, submittedBy: { __typename?: 'User', name: string }, images: Array<{ __typename?: 'JobRecordImage', id: string, url: string }>, jobForm?: { __typename?: 'JobForm', formTemplate: { __typename?: 'FormTemplate', name: string, description?: string | null, structure?: any | null } } | null, formResponse?: { __typename?: 'JobFormResponse', response?: any | null } | null } };


export const InitialiseUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InitialiseUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"initialiseUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<InitialiseUserMutation, InitialiseUserMutationVariables>;
export const PreSignedUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PreSignedUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"presignedUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key"}}}]}]}}]} as unknown as DocumentNode<PreSignedUrlQuery, PreSignedUrlQueryVariables>;
export const SettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Settings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"organisation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<SettingsQuery, SettingsQueryVariables>;
export const JobCellDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JobCell"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"job"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"variations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"attachments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]} as unknown as DocumentNode<JobCellQuery, JobCellQueryVariables>;
export const JobFormSelectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JobFormSelect"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"job"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jobForms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"structure"}}]}}]}}]}}]} as unknown as DocumentNode<JobFormSelectQuery, JobFormSelectQueryVariables>;
export const VariationCellDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VariationCell"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"variationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jobRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"variationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"submittedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"initialData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"numPeople"}},{"kind":"Field","name":{"kind":"Name","value":"who"}},{"kind":"Field","name":{"kind":"Name","value":"materials"}},{"kind":"Field","name":{"kind":"Name","value":"equipment"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"scopeItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"reference"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<VariationCellQuery, VariationCellQueryVariables>;
export const JobSelectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JobSelect"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JobSearchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchJobs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"jobSearchInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<JobSelectQuery, JobSelectQueryVariables>;
export const GetScopeItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetScopeItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jobScopeItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"jobId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"reference"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetScopeItemsQuery, GetScopeItemsQueryVariables>;
export const JobsCellDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JobsCell"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JobSearchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchJobs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"jobSearchInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<JobsCellQuery, JobsCellQueryVariables>;
export const VariationsCellDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VariationsCell"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JobRecordSearchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchJobRecords"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"jobRecordSearchInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"submittedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<VariationsCellQuery, VariationsCellQueryVariables>;
export const CreateCrewLogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCrewLog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCrewLogInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCrewLog"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createCrewLogInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateCrewLogMutation, CreateCrewLogMutationVariables>;
export const UpdateCrewLogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCrewLog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCrewLogInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCrewLog"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateCrewLogInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateCrewLogMutation, UpdateCrewLogMutationVariables>;
export const CreateJobRecordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateJobRecord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateJobRecordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createJobRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createJobRecordInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateJobRecordMutation, CreateJobRecordMutationVariables>;
export const UpdateJobRecordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateJobRecord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateJobRecordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateJobRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateJobRecordInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateJobRecordMutation, UpdateJobRecordMutationVariables>;
export const CreateVariationInitialDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateVariationInitialData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateVariationInitialDataInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createVariationInitialData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createVariationInitialDataInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateVariationInitialDataMutation, CreateVariationInitialDataMutationVariables>;
export const JobFormsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JobForms"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"job"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jobForms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]} as unknown as DocumentNode<JobFormsQuery, JobFormsQueryVariables>;
export const OrganisationFormSelectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OrganisationFormSelect"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formTemplates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}}]} as unknown as DocumentNode<OrganisationFormSelectQuery, OrganisationFormSelectQueryVariables>;
export const PreSignedUrlWebDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PreSignedUrlWeb"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"presignedUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key"}}}]}]}}]} as unknown as DocumentNode<PreSignedUrlWebQuery, PreSignedUrlWebQueryVariables>;
export const CrewPageTableSectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CrewPageTableSection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userSearchInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"userOrganisation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<CrewPageTableSectionQuery, CrewPageTableSectionQueryVariables>;
export const CreateJobAttachmentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateJobAttachments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAttachmentsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAttachments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createAttachmentInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"referenceId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]} as unknown as DocumentNode<CreateJobAttachmentsMutation, CreateJobAttachmentsMutationVariables>;
export const JobAttachmentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JobAttachments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"referenceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"attachments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"referenceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"referenceId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<JobAttachmentsQuery, JobAttachmentsQueryVariables>;
export const DeleteJobAttachmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteJobAttachment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeJobAttachment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<DeleteJobAttachmentMutation, DeleteJobAttachmentMutationVariables>;
export const JobCrewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JobCrew"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jobCrew"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"jobId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"userOrganisation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]}}]}}]} as unknown as DocumentNode<JobCrewQuery, JobCrewQueryVariables>;
export const JobDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JobDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"job"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<JobDetailsQuery, JobDetailsQueryVariables>;
export const DeleteJobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteJob"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteJob"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<DeleteJobMutation, DeleteJobMutationVariables>;
export const JobScopeItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JobScopeItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jobScopeItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"jobId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"reference"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<JobScopeItemsQuery, JobScopeItemsQueryVariables>;
export const UserOrgExportDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserOrgExport"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"organisation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}}]}}]}}]}}]} as unknown as DocumentNode<UserOrgExportQuery, UserOrgExportQueryVariables>;
export const UserAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"organisation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<UserAccountQuery, UserAccountQueryVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const UserOrgSettingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UserOrgSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"organisation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}}]}}]}}]}}]} as unknown as DocumentNode<UserOrgSettingsQuery, UserOrgSettingsQueryVariables>;
export const UpdateOrganisationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOrganisation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateOrganisationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOrganisation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateOrganisationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"logoUrl"}}]}}]}}]} as unknown as DocumentNode<UpdateOrganisationMutation, UpdateOrganisationMutationVariables>;
export const CreateFormTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateFormTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateFormTemplateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createFormTemplate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createFormTemplateInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateFormTemplateMutation, CreateFormTemplateMutationVariables>;
export const UpdateFormTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateFormTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateFormTemplateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateFormTemplate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateFormTemplateInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateFormTemplateMutation, UpdateFormTemplateMutationVariables>;
export const FindFormTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindFormTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formTemplate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"structure"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<FindFormTemplateQuery, FindFormTemplateQueryVariables>;
export const FindAllFormTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAllFormTemplate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formTemplates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"autoAssign"}}]}}]}}]} as unknown as DocumentNode<FindAllFormTemplateQuery, FindAllFormTemplateQueryVariables>;
export const CreateJobFormDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateJobForm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateJobFormInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createJobForm"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createJobFormInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateJobFormMutation, CreateJobFormMutationVariables>;
export const DeleteJobRecordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteJobRecord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeJobRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteJobRecordMutation, DeleteJobRecordMutationVariables>;
export const CreateJobScopeItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createJobScopeItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateJobScopeItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createJobScopeItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createJobScopeItemInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"jobId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"reference"}}]}}]}}]} as unknown as DocumentNode<CreateJobScopeItemMutation, CreateJobScopeItemMutationVariables>;
export const UpdateJobScopeItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateJobScopeItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateJobScopeItemInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateJobScopeItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateJobScopeItemInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"jobId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"reference"}}]}}]}}]} as unknown as DocumentNode<UpdateJobScopeItemMutation, UpdateJobScopeItemMutationVariables>;
export const DeleteJobScopeItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteJobScopeItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeJobScopeItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"jobId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"reference"}}]}}]}}]} as unknown as DocumentNode<DeleteJobScopeItemMutation, DeleteJobScopeItemMutationVariables>;
export const GetJobScopeItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getJobScopeItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jobScopeItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"jobId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"jobId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"reference"}}]}}]}}]} as unknown as DocumentNode<GetJobScopeItemsQuery, GetJobScopeItemsQueryVariables>;
export const CreateJobMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateJobMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateJobInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createJob"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createJobInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<CreateJobMutationMutation, CreateJobMutationMutationVariables>;
export const UpdateJobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateJob"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateJobInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateJob"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateJobInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateJobMutation, UpdateJobMutationVariables>;
export const DashboardSearchJobsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DashboardSearchJobs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JobSearchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchJobs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"jobSearchInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<DashboardSearchJobsQuery, DashboardSearchJobsQueryVariables>;
export const JobsTableSearchJobsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JobsTableSearchJobs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JobSearchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchJobs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"jobSearchInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"variations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"flag"}}]}}]}}]}}]} as unknown as DocumentNode<JobsTableSearchJobsQuery, JobsTableSearchJobsQueryVariables>;
export const JobSelectSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JobSelectSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JobSearchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchJobs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"jobSearchInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<JobSelectSearchQuery, JobSelectSearchQueryVariables>;
export const JobWithCrewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JobWithCrew"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"job"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"dueDate"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"jobCrew"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"jobId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<JobWithCrewQuery, JobWithCrewQueryVariables>;
export const JobPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JobPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"job"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"jobId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<JobPageQuery, JobPageQueryVariables>;
export const CreateProjectMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProjectMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProjectInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createProjectInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]} as unknown as DocumentNode<CreateProjectMutationMutation, CreateProjectMutationMutationVariables>;
export const UpdateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProjectInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateProjectInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const FindAllProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAllProjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"customer"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"jobs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<FindAllProjectsQuery, FindAllProjectsQueryVariables>;
export const FindProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"customer"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<FindProjectQuery, FindProjectQueryVariables>;
export const RemoveProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveProjectMutation, RemoveProjectMutationVariables>;
export const InviteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InviteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InviteUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"inviteUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inviteInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<InviteUserMutation, InviteUserMutationVariables>;
export const IsUserInitialisedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"IsUserInitialised"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isUserInitialised"}}]}}]} as unknown as DocumentNode<IsUserInitialisedQuery, IsUserInitialisedQueryVariables>;
export const CreateVariationResourceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateVariationResource"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateVariationResourceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createVariationResource"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createVariationResourceInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"jobRecordId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateVariationResourceMutation, CreateVariationResourceMutationVariables>;
export const UpdateVariationResourceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateVariationResource"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateVariationResourceInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateVariationResource"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"updateVariationResourceInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"jobRecordId"}}]}}]}}]} as unknown as DocumentNode<UpdateVariationResourceMutation, UpdateVariationResourceMutationVariables>;
export const VariationResourcesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VariationResources"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"variationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"variationResources"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"variationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"variationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"unitPrice"}},{"kind":"Field","name":{"kind":"Name","value":"hours"}},{"kind":"Field","name":{"kind":"Name","value":"rate"}},{"kind":"Field","name":{"kind":"Name","value":"numPeople"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<VariationResourcesQuery, VariationResourcesQueryVariables>;
export const DeleteVariationResourceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteVariationResource"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeVariationResource"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteVariationResourceMutation, DeleteVariationResourceMutationVariables>;
export const ResourceSummaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ResourceSummary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"variationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"variationResourceSummary"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"variationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"variationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"labourTotal"}},{"kind":"Field","name":{"kind":"Name","value":"materialTotal"}},{"kind":"Field","name":{"kind":"Name","value":"equipmentTotal"}},{"kind":"Field","name":{"kind":"Name","value":"otherTotal"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<ResourceSummaryQuery, ResourceSummaryQueryVariables>;
export const JobRecordTableSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JobRecordTableSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JobRecordSearchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchJobRecords"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"jobRecordSearchInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"flag"}},{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"jobForm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formTemplate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"submittedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<JobRecordTableSearchQuery, JobRecordTableSearchQueryVariables>;
export const DashboardSearchVariationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DashboardSearchVariations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JobRecordSearchInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchJobRecords"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"jobRecordSearchInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"flag"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"submittedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<DashboardSearchVariationsQuery, DashboardSearchVariationsQueryVariables>;
export const JobRecordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"JobRecord"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jobRecord"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"flag"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"job"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"customerName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"submittedBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"jobForm"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formTemplate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"structure"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"formResponse"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"response"}}]}}]}}]}}]} as unknown as DocumentNode<JobRecordQuery, JobRecordQueryVariables>;
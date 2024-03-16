import {boolean, numeric, pgTable, text, timestamp, uuid, varchar,} from 'drizzle-orm/pg-core';
import {InferInsertModel, InferSelectModel, relations, sql,} from 'drizzle-orm';

// ###################### USER ######################
// noinspection TypeScriptValidateTypes
export const user = pgTable('user', {
    id: uuid('id')
        .default(sql`gen_random_uuid
        ()`)
        .primaryKey(),
    authId: text('auth_id').notNull(),
    name: text('full_name'),
    phone: varchar('phone', {length: 20}),
    email: varchar('email', {length: 100}).unique(),
    status: varchar('status', {enum: ['ACTIVE', 'INACTIVE']}).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type User = InferSelectModel<typeof user>;
export type NewUser = InferInsertModel<typeof user>;

export const userRelations = relations(user, ({one, many}) => ({
    organisations: many(organisation),
}));

// ###################### ORGANISATION TABLE ######################
export const organisation = pgTable('organisation', {
    id: uuid('id')
        .default(sql`gen_random_uuid
        ()`)
        .primaryKey(),
    name: text('name').notNull(),
    authId: text('auth_id').notNull(),
    logoUrl: text('logo_url'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Organisation = InferSelectModel<typeof organisation>;
export type NewOrganisation = InferInsertModel<typeof organisation>;

const organisationRelations = relations(organisation, ({one, many}) => ({
    users: many(user),
}));

export const userOrganisation = pgTable('user_organisation', {
    id: uuid('id')
        .default(sql`gen_random_uuid
        ()`)
        .primaryKey(),
    userId: uuid('user_id')
        .references(() => user.id, {onDelete: 'cascade'})
        .notNull(),
    organisationId: uuid('organisation_id')
        .references(() => organisation.id, {onDelete: 'cascade'})
        .notNull(),
    role: varchar('role').notNull(),
});

export type UserOrganisation = InferSelectModel<typeof userOrganisation>;
export type NewUserOrganisation = InferInsertModel<typeof userOrganisation>;

// ###################### PROJECT TABLE ######################
export const project = pgTable('project', {
    id: uuid('id')
        .default(sql`gen_random_uuid
        ()`)
        .primaryKey(),
    title: text('name').notNull(),
    description: text('description'),
    customer: text('customer'),
    organisationId: uuid('organisation_id').notNull().references(() => organisation.id),
    status: varchar('status', {
        enum: ['UPCOMING', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED'],
    }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
});

export type Project = InferSelectModel<typeof project>;
export type NewProject = InferInsertModel<typeof project>;

export const projectRelations = relations(project, ({one, many}) => ({
    organisation: one(organisation, {
        fields: [project.organisationId],
        references: [organisation.id],
    }),
    jobs: many(job),
}));


// ###################### JOB TABLE ######################
export const job = pgTable('job', {
    id: uuid('id')
        .default(sql`gen_random_uuid
        ()`)
        .primaryKey(),
    title: text('title').notNull(),
    description: text('description'),
    customerName: text('customer_name'),
    status: varchar('status', {
        enum: ['UPCOMING', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED'],
    }),
    projectId: uuid('project_id').references(() => project.id),
    ownerId: uuid('owner_id')
        .references(() => user.id)
        .notNull(),
    organisationId: uuid('organisation_id').notNull().references(() => organisation.id),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
});

export type Job = InferSelectModel<typeof job>;
export type NewJob = InferInsertModel<typeof job>;
export type UpdateJob = Partial<NewJob>

export const attachment = pgTable('job_attachment', {
    id: uuid('id')
        .default(sql`gen_random_uuid
        ()`)
        .primaryKey(),
    referenceId: uuid('reference_id').notNull(),
    referenceType: varchar('reference_type').notNull(),
    name: text('name').notNull(),
    url: text('url').notNull(),
    type: varchar('type'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
});

export type Attachment = InferSelectModel<typeof attachment>;
export type NewAttachment = InferInsertModel<typeof attachment>;

export const jobScopeItem = pgTable('job_scope_item', {
    id: uuid('id')
        .default(sql`gen_random_uuid
        ()`)
        .primaryKey(),
    jobId: uuid('job_id')
        .references(() => job.id, {onDelete: 'cascade'})
        .notNull(),
    reference: text('reference'),
    title: text('title'),
    description: text('description'),
});

export const jobScopeItemRelations = relations(jobScopeItem, ({one}) => ({
    job: one(job, {
        fields: [jobScopeItem.jobId],
        references: [job.id],
    }),
}));

export type JobScopeItem = InferSelectModel<typeof jobScopeItem>;
export type NewJobScopeItem = InferInsertModel<typeof jobScopeItem>;
export type UpdateJobScopeItem = Partial<NewJobScopeItem>

export const jobRelations = relations(job, ({one, many}) => ({
    owner: one(user, {
        fields: [job.ownerId],
        references: [user.id],
    }),
    jobRecords: many(jobRecord),
    scopeItems: many(jobScopeItem),
    crew: many(user)
}));

// ###################### JOB CREW TABLE ######################

export const jobCrew = pgTable('job_crew', {
    id: uuid('id')
        .default(sql`gen_random_uuid
        ()`)
        .primaryKey(),
    jobId: uuid('job_id')
        .references(() => job.id, {onDelete: 'cascade'})
        .notNull(),
    crewMemberId: uuid('crew_member_id')
        .references(() => user.id)
        .notNull(),
});

export type JobCrew = InferSelectModel<typeof jobCrew>;
export type NewJobCrew = InferInsertModel<typeof jobCrew>;

export const jobCrewRelations = relations(jobCrew, ({one}) => ({
    job: one(job, {
        fields: [jobCrew.jobId],
        references: [job.id],
    }),
    crewMember: one(user, {
        fields: [jobCrew.crewMemberId],
        references: [user.id],
    }),
}));

// ###################### VARIATION TABLE ######################
export const jobRecord = pgTable('job_record', {
    id: uuid('id')
        .default(sql`gen_random_uuid
        ()`)
        .primaryKey(),
    jobId: uuid('job_id')
        .references(() => job.id)
        .notNull(),
    scopeRef: text('scope_ref'),
    title: text('title').notNull(),
    description: text('description'),
    type: varchar('type', {enum: ['VARIATION', 'NOTE', "QA", "SAFETY", "CREW_LOG"]}),
    status: varchar('status', {
        enum: ["IN_REVIEW", "SUBMITTED", 'APPROVED', 'REJECTED', "NO_ACTION", 'ARCHIVED']
    }),
    flag: varchar('flag', {enum: ['POTENTIAL', "CONFIRMED", 'IN_PROGRESS', 'COMPLETED', "HIGH_RISK", "MEDIUM_RISK", "LOW_RISK"]}),
    submittedBy: uuid('submitted_by')
        .references(() => user.id)
        .notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
});

export type JobRecord = InferSelectModel<typeof jobRecord>;
export type NewJobRecord = InferInsertModel<typeof jobRecord>;
export type UpdateJobRecord = Partial<NewJobRecord>

export const jobRecordRelations = relations(jobRecord, ({one, many}) => ({
    job: one(job, {
        fields: [jobRecord.jobId],
        references: [job.id],
    }),
    submittedBy: one(user, {
        fields: [jobRecord.submittedBy],
        references: [user.id],
    }),
    resources: many(variationResource),
    images: many(jobRecordImage),

}));

// ###################### VARIATION RESOURCES TABLE ######################
export const variationResource = pgTable('variation_resource', {
    id: uuid('id')
        .default(sql`gen_random_uuid
        ()`)
        .primaryKey(),
    jobRecordId: uuid('job_record_id')
        .references(() => jobRecord.id, {onDelete: 'cascade'})
        .notNull(),
    type: varchar('type', {enum: ['LABOUR', 'MATERIAL', 'EQUIPMENT', 'OTHER']}),
    description: text('description'),
    quantity: numeric('quantity'),
    unit: varchar('unit'),
    unitPrice: numeric('unit_price'),
    hours: numeric('hours'),
    rate: numeric('rate'),
    numPeople: numeric('num_people'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
});

export type VariationResource = InferSelectModel<typeof variationResource>;
export type NewVariationResource = InferInsertModel<typeof variationResource>;

// ###################### VARIATION IMAGE TABLE ######################
export const jobRecordImage = pgTable('job_record_image', {
    id: uuid('id')
        .default(sql`gen_random_uuid
        ()`)
        .primaryKey(),
    jobRecordId: uuid('job_record_id')
        .references(() => jobRecord.id, {onDelete: 'cascade'})
        .notNull(),
    url: text('url').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
});

export type JobRecordImage = InferSelectModel<typeof jobRecordImage>;
export type NewJobRecordImage = InferInsertModel<typeof jobRecordImage>;

export const variationInitialData = pgTable('variation_initial_data', {
    id: uuid('id')
        .default(sql`gen_random_uuid
        ()`)
        .primaryKey(),
    jobRecordId: uuid('job_record_id')
        .references(() => jobRecord.id, {onDelete: 'cascade'})
        .notNull(),
    hours: numeric('time'),
    numPeople: numeric('num_people'),
    who: text('who'),
    materials: text('materials'),
    equipment: text('equipment'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
});

export type VariationInitialData = InferSelectModel<typeof variationInitialData>;
export type NewVariationInitialData = InferInsertModel<typeof variationInitialData>;
// ###################### NOTIFICATION TABLE ######################
export const notification = pgTable('notification', {
    id: uuid('id')
        .default(sql`gen_random_uuid
        ()`)
        .primaryKey(),
    jobId: uuid('job_id')
        .references(() => job.id)
        .notNull(),
    jobRecordId: uuid('job_record_id').references(() => jobRecord.id),
    message: text('message').notNull(),
    isRead: boolean('is_read').default(false),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
        .default(sql`CURRENT_TIMESTAMP`)
        .notNull(),
});

export type Notification = InferSelectModel<typeof notification>;
export type NewNotification = InferInsertModel<typeof notification>;

export const notificationRelations = relations(notification, ({one}) => ({
    job: one(job, {
        fields: [notification.jobId],
        references: [job.id],
    }),
    jobRecord: one(jobRecord, {
        fields: [notification.jobRecordId],
        references: [jobRecord.id],
    }),
}));

////////////////////////// CREW LOG //////////////////////////
export const crewLog = pgTable('crew_log', {
    id: uuid('id')
        .default(sql`gen_random_uuid
        ()`)
        .primaryKey(),
    userId: uuid('crew_member_id')
        .references(() => user.id)
        .notNull(),
    jobId: uuid('job_id')
        .references(() => job.id)
        .notNull(),
    scopeRef: text('scope_ref'),
    startTime: timestamp('start_time'),
    endTime: timestamp('end_time'),
    notes: text('message'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type CrewLog = InferSelectModel<typeof crewLog>;
export type NewCrewLog = InferInsertModel<typeof crewLog>;

export const crewLogRelations = relations(crewLog, ({one, many}) => ({
    crewMember: one(user, {
        fields: [crewLog.userId],
        references: [user.id],
    }),
    job: one(job, {
        fields: [crewLog.jobId],
        references: [job.id],
    }),
    images: many(crewLogImage),
}));


export const crewLogImage = pgTable('crew_log_image', {
    id: uuid('id')
        .default(sql`gen_random_uuid
        ()`)
        .primaryKey(),
    crewLogId: uuid('crew_log_id')
        .references(() => crewLog.id)
        .notNull(),
    url: text('url').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type CrewLogImage = InferSelectModel<typeof crewLogImage>;
export type NewCrewLogImage = InferInsertModel<typeof crewLogImage>;



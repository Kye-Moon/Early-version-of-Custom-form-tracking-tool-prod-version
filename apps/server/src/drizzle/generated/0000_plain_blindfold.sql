CREATE TABLE IF NOT EXISTS "crew_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid
        () NOT NULL,
	"crew_member_id" uuid NOT NULL,
	"job_id" uuid NOT NULL,
	"scope_ref" text,
	"start_time" timestamp,
	"end_time" timestamp,
	"message" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "crew_log_image" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid
        () NOT NULL,
	"crew_log_id" uuid NOT NULL,
	"url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid
        () NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"customer_name" text,
	"status" varchar,
	"owner_id" uuid NOT NULL,
	"organisation_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job_attachment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid
        () NOT NULL,
	"job_id" uuid NOT NULL,
	"name" text NOT NULL,
	"url" text NOT NULL,
	"type" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job_crew" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid
        () NOT NULL,
	"job_id" uuid NOT NULL,
	"crew_member_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job_record" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid
        () NOT NULL,
	"job_id" uuid NOT NULL,
	"scope_ref" text,
	"title" text NOT NULL,
	"description" text,
	"type" varchar,
	"status" varchar,
	"flag" varchar,
	"submitted_by" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job_record_image" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid
        () NOT NULL,
	"job_record_id" uuid NOT NULL,
	"url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job_scope_item" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid
        () NOT NULL,
	"job_id" uuid NOT NULL,
	"reference" text,
	"title" text,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid
        () NOT NULL,
	"job_id" uuid NOT NULL,
	"job_record_id" uuid,
	"message" text NOT NULL,
	"is_read" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organisation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid
        () NOT NULL,
	"name" text NOT NULL,
	"auth_id" text NOT NULL,
	"logo_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid
        () NOT NULL,
	"auth_id" text NOT NULL,
	"full_name" text,
	"phone" varchar(20),
	"email" varchar(100),
	"status" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_organisation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid
        () NOT NULL,
	"user_id" uuid NOT NULL,
	"organisation_id" uuid NOT NULL,
	"role" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "variation_initial_data" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid
        () NOT NULL,
	"job_record_id" uuid NOT NULL,
	"time" numeric,
	"num_people" numeric,
	"who" text,
	"materials" text,
	"equipment" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "variation_resource" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid
        () NOT NULL,
	"job_record_id" uuid NOT NULL,
	"type" varchar,
	"description" text,
	"quantity" numeric,
	"unit" varchar,
	"unit_price" numeric,
	"hours" numeric,
	"rate" numeric,
	"num_people" numeric,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crew_log" ADD CONSTRAINT "crew_log_crew_member_id_user_id_fk" FOREIGN KEY ("crew_member_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crew_log" ADD CONSTRAINT "crew_log_job_id_job_id_fk" FOREIGN KEY ("job_id") REFERENCES "job"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "crew_log_image" ADD CONSTRAINT "crew_log_image_crew_log_id_crew_log_id_fk" FOREIGN KEY ("crew_log_id") REFERENCES "crew_log"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job" ADD CONSTRAINT "job_owner_id_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job" ADD CONSTRAINT "job_organisation_id_organisation_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "organisation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_attachment" ADD CONSTRAINT "job_attachment_job_id_job_id_fk" FOREIGN KEY ("job_id") REFERENCES "job"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_crew" ADD CONSTRAINT "job_crew_job_id_job_id_fk" FOREIGN KEY ("job_id") REFERENCES "job"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_crew" ADD CONSTRAINT "job_crew_crew_member_id_user_id_fk" FOREIGN KEY ("crew_member_id") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_record" ADD CONSTRAINT "job_record_job_id_job_id_fk" FOREIGN KEY ("job_id") REFERENCES "job"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_record" ADD CONSTRAINT "job_record_submitted_by_user_id_fk" FOREIGN KEY ("submitted_by") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_record_image" ADD CONSTRAINT "job_record_image_job_record_id_job_record_id_fk" FOREIGN KEY ("job_record_id") REFERENCES "job_record"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_scope_item" ADD CONSTRAINT "job_scope_item_job_id_job_id_fk" FOREIGN KEY ("job_id") REFERENCES "job"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notification" ADD CONSTRAINT "notification_job_id_job_id_fk" FOREIGN KEY ("job_id") REFERENCES "job"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notification" ADD CONSTRAINT "notification_job_record_id_job_record_id_fk" FOREIGN KEY ("job_record_id") REFERENCES "job_record"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_organisation" ADD CONSTRAINT "user_organisation_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_organisation" ADD CONSTRAINT "user_organisation_organisation_id_organisation_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "organisation"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "variation_initial_data" ADD CONSTRAINT "variation_initial_data_job_record_id_job_record_id_fk" FOREIGN KEY ("job_record_id") REFERENCES "job_record"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "variation_resource" ADD CONSTRAINT "variation_resource_job_record_id_job_record_id_fk" FOREIGN KEY ("job_record_id") REFERENCES "job_record"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

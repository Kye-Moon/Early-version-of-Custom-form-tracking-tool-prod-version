CREATE TABLE IF NOT EXISTS "form_template" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid
        () NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"category" text NOT NULL,
	"organisation_id" uuid,
	"auto_assign" boolean DEFAULT false,
	"structure" jsonb,
	"status" varchar DEFAULT 'PENDING',
	"is_system_default" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job_form" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid
        () NOT NULL,
	"job_id" uuid NOT NULL,
	"form_template_id" uuid NOT NULL,
	"is_active" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job_form_response" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid
        () NOT NULL,
	"job_form_id" uuid NOT NULL,
	"job_record_id" uuid NOT NULL,
	"response" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
ALTER TABLE "job_record" ALTER COLUMN "title" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "job_record" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "job_record" ADD COLUMN "archived" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "job_record" ADD COLUMN "job_form_id" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_record" ADD CONSTRAINT "job_record_job_form_id_job_form_id_fk" FOREIGN KEY ("job_form_id") REFERENCES "job_form"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "job_record" DROP COLUMN IF EXISTS "status";--> statement-breakpoint
ALTER TABLE "job_record" DROP COLUMN IF EXISTS "flag";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "form_template" ADD CONSTRAINT "form_template_organisation_id_organisation_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "organisation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_form" ADD CONSTRAINT "job_form_job_id_job_id_fk" FOREIGN KEY ("job_id") REFERENCES "job"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_form" ADD CONSTRAINT "job_form_form_template_id_form_template_id_fk" FOREIGN KEY ("form_template_id") REFERENCES "form_template"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_form_response" ADD CONSTRAINT "job_form_response_job_form_id_job_form_id_fk" FOREIGN KEY ("job_form_id") REFERENCES "job_form"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_form_response" ADD CONSTRAINT "job_form_response_job_record_id_job_record_id_fk" FOREIGN KEY ("job_record_id") REFERENCES "job_record"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

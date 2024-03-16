ALTER TABLE "job_attachment" RENAME COLUMN "job_id" TO "reference_id";--> statement-breakpoint
ALTER TABLE "job_attachment" DROP CONSTRAINT "job_attachment_job_id_job_id_fk";
--> statement-breakpoint
ALTER TABLE "job_attachment" ADD COLUMN "reference_type" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "customer" text;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "status" varchar;
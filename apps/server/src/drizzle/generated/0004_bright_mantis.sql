ALTER TABLE "job_record" DROP CONSTRAINT "job_record_job_id_job_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "job_record" ADD CONSTRAINT "job_record_job_id_job_id_fk" FOREIGN KEY ("job_id") REFERENCES "job"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

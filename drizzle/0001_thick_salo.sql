ALTER TABLE "user" ALTER COLUMN "bio" SET DATA TYPE varchar(250);--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "bio" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "bio" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_username_unique" UNIQUE("username");
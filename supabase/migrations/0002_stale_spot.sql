CREATE TABLE IF NOT EXISTS "revenues" (
	"month" varchar(4) NOT NULL,
	"revenue" integer NOT NULL,
	CONSTRAINT "revenues_month_unique" UNIQUE("month")
);

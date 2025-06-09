ALTER TABLE "wallets" DROP CONSTRAINT "wallets_customer_customers_id_fk";
--> statement-breakpoint
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_customer_customers_id_fk" FOREIGN KEY ("customer") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE no action;
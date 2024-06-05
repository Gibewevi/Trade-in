-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "BillingInvoiceRelation";

-- RenameForeignKey
ALTER TABLE "invoices" RENAME CONSTRAINT "UserInvoiceRelation" TO "invoices_userId_fkey";

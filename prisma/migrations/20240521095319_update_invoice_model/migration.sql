-- RenameForeignKey
ALTER TABLE "invoices" RENAME CONSTRAINT "invoices_userId_fkey" TO "UserInvoiceRelation";

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "BillingInvoiceRelation" FOREIGN KEY ("userId") REFERENCES "billings"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

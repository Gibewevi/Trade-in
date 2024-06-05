/*
  Warnings:

  - You are about to drop the column `billingId` on the `invoices` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_billingId_fkey";

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "billingId";

/*
  Warnings:

  - Added the required column `country` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invoices" ADD COLUMN     "country" TEXT NOT NULL;

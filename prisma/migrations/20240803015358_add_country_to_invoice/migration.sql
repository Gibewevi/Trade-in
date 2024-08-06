/*
  Warnings:

  - You are about to drop the column `country` on the `invoices` table. All the data in the column will be lost.
  - Added the required column `countryName` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "country",
ADD COLUMN     "countryName" TEXT NOT NULL;

/*
  Warnings:

  - You are about to drop the column `amount` on the `billings` table. All the data in the column will be lost.
  - You are about to drop the column `billingDate` on the `billings` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `billings` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `billings` table. All the data in the column will be lost.
  - You are about to drop the column `formationId` on the `billings` table. All the data in the column will be lost.
  - You are about to drop the column `line1` on the `billings` table. All the data in the column will be lost.
  - You are about to drop the column `line2` on the `billings` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `billings` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `billings` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `billings` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `billingAddressLine1` to the `billings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingCity` to the `billings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingCountry` to the `billings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingPostalCode` to the `billings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `billingState` to the `billings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `billings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "billings" DROP CONSTRAINT "billings_formationId_fkey";

-- AlterTable
ALTER TABLE "billings" DROP COLUMN "amount",
DROP COLUMN "billingDate",
DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "formationId",
DROP COLUMN "line1",
DROP COLUMN "line2",
DROP COLUMN "postalCode",
DROP COLUMN "state",
ADD COLUMN     "billingAddressLine1" TEXT NOT NULL,
ADD COLUMN     "billingAddressLine2" TEXT,
ADD COLUMN     "billingCity" TEXT NOT NULL,
ADD COLUMN     "billingCountry" TEXT NOT NULL,
ADD COLUMN     "billingPostalCode" TEXT NOT NULL,
ADD COLUMN     "billingState" TEXT NOT NULL,
ADD COLUMN     "fullName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "invoices" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "billingId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "amountHt" DOUBLE PRECISION,
    "tps" DOUBLE PRECISION,
    "tvp" DOUBLE PRECISION,
    "taxRate" DOUBLE PRECISION,
    "currency" TEXT NOT NULL,
    "paymentStatus" TEXT NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tax_rates" (
    "id" SERIAL NOT NULL,
    "province" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "tps" DOUBLE PRECISION NOT NULL,
    "tvp" DOUBLE PRECISION NOT NULL,
    "totalTax" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "tax_rates_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "billings_userId_key" ON "billings"("userId");

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_billingId_fkey" FOREIGN KEY ("billingId") REFERENCES "billings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

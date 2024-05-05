/*
  Warnings:

  - You are about to drop the `subscriptions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `formationId` to the `chapters` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "subscriptions" DROP CONSTRAINT "subscriptions_userId_fkey";

-- AlterTable
ALTER TABLE "chapters" ADD COLUMN     "formationId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "subscriptions";

-- CreateTable
CREATE TABLE "formations" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "formations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "billings" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "formationId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "billingDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "line1" TEXT,
    "line2" TEXT,
    "city" TEXT,
    "postalCode" TEXT,
    "state" TEXT,
    "country" TEXT,

    CONSTRAINT "billings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "billings" ADD CONSTRAINT "billings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "billings" ADD CONSTRAINT "billings_formationId_fkey" FOREIGN KEY ("formationId") REFERENCES "formations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_formationId_fkey" FOREIGN KEY ("formationId") REFERENCES "formations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

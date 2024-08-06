/*
  Warnings:

  - The values [PREMIUM] on the enum `AccessLevel` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `formationId` on the `chapters` table. All the data in the column will be lost.
  - You are about to drop the `formations` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `courseId` to the `chapters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AccessLevel_new" AS ENUM ('FREE', 'INVESTMENT', 'TRADERPRO');
ALTER TABLE "lessons" ALTER COLUMN "accessLevel" TYPE "AccessLevel_new" USING ("accessLevel"::text::"AccessLevel_new");
ALTER TYPE "AccessLevel" RENAME TO "AccessLevel_old";
ALTER TYPE "AccessLevel_new" RENAME TO "AccessLevel";
DROP TYPE "AccessLevel_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "chapters" DROP CONSTRAINT "chapters_formationId_fkey";

-- AlterTable
ALTER TABLE "chapters" DROP COLUMN "formationId",
ADD COLUMN     "courseId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "invoices" ADD COLUMN     "courseId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "formations";

-- CreateTable
CREATE TABLE "Courses" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

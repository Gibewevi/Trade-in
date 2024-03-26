/*
  Warnings:

  - A unique constraint covering the columns `[chapterId]` on the table `chapters` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[lessonId]` on the table `lessons` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chapterId` to the `chapters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lessonId` to the `lessons` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "lessons" DROP CONSTRAINT "lessons_chapterId_fkey";

-- AlterTable
ALTER TABLE "chapters" ADD COLUMN     "chapterId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "lessons" ADD COLUMN     "lessonId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "chapters_chapterId_key" ON "chapters"("chapterId");

-- CreateIndex
CREATE UNIQUE INDEX "lessons_lessonId_key" ON "lessons"("lessonId");

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "chapters"("chapterId") ON DELETE RESTRICT ON UPDATE CASCADE;

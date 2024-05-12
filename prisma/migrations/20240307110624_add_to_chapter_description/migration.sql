/*
  Warnings:

  - Added the required column `description` to the `chapters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chapters" ADD COLUMN     "description" TEXT NOT NULL;

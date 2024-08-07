/*
  Warnings:

  - You are about to drop the column `token` on the `password_reset_tokens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `password_reset_tokens` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uuid` to the `password_reset_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "password_reset_tokens_token_key";

-- AlterTable
ALTER TABLE "password_reset_tokens" DROP COLUMN "token",
ADD COLUMN     "uuid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_tokens_uuid_key" ON "password_reset_tokens"("uuid");

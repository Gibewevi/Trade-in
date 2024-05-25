/*
  Warnings:

  - You are about to drop the `Devise` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Devise";

-- CreateTable
CREATE TABLE "devise" (
    "id" SERIAL NOT NULL,
    "pays" TEXT NOT NULL,
    "devise" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,

    CONSTRAINT "devise_pkey" PRIMARY KEY ("id")
);

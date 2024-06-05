/*
  Warnings:

  - You are about to drop the `country` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "country";

-- CreateTable
CREATE TABLE "devise" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "devise_pkey" PRIMARY KEY ("id")
);

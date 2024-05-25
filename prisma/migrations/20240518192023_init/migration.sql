/*
  Warnings:

  - You are about to drop the `devise` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "devise";

-- CreateTable
CREATE TABLE "country" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "country_pkey" PRIMARY KEY ("id")
);

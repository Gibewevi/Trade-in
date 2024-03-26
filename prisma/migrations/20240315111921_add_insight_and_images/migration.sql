-- CreateEnum
CREATE TYPE "RiskLevel" AS ENUM ('EASY', 'MODERATE', 'HARD');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NEW', 'UPDATE', 'CLOSE');

-- CreateTable
CREATE TABLE "insights" (
    "id" SERIAL NOT NULL,
    "pair" TEXT NOT NULL,
    "riskLevel" "RiskLevel" NOT NULL,
    "status" "Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "insights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "insight_images" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "insightId" INTEGER NOT NULL,

    CONSTRAINT "insight_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "insight_images" ADD CONSTRAINT "insight_images_insightId_fkey" FOREIGN KEY ("insightId") REFERENCES "insights"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

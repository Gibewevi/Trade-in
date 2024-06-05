-- CreateTable
CREATE TABLE "Devise" (
    "id" SERIAL NOT NULL,
    "pays" TEXT NOT NULL,
    "devise" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,

    CONSTRAINT "Devise_pkey" PRIMARY KEY ("id")
);

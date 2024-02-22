-- CreateTable
CREATE TABLE "users_credentials" (
    "user_id" SERIAL NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,

    CONSTRAINT "users_credentials_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_credentials_user_email_key" ON "users_credentials"("user_email");

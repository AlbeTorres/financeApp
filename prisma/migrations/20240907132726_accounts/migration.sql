-- CreateTable
CREATE TABLE "Bank_Account" (
    "id" TEXT NOT NULL,
    "plaidId" TEXT,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Bank_Account_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bank_Account" ADD CONSTRAINT "Bank_Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

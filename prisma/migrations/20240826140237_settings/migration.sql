-- CreateEnum
CREATE TYPE "Languaje" AS ENUM ('en', 'es');

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "language" "Languaje" NOT NULL DEFAULT 'en',

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

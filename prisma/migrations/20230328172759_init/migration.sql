/*
  Warnings:

  - You are about to drop the column `emailVerifiedCode` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailVerifiedCode",
ADD COLUMN     "verificationCode" TEXT;

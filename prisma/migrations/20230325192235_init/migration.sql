/*
  Warnings:

  - You are about to drop the column `userId` on the `Expenses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Expenses" DROP CONSTRAINT "Expenses_userId_fkey";

-- AlterTable
ALTER TABLE "Expenses" DROP COLUMN "userId";

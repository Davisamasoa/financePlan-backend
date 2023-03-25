/*
  Warnings:

  - You are about to drop the column `financePlanid` on the `Expenses` table. All the data in the column will be lost.
  - Added the required column `financePlanId` to the `Expenses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Expenses" DROP CONSTRAINT "Expenses_financePlanid_fkey";

-- AlterTable
ALTER TABLE "Expenses" DROP COLUMN "financePlanid",
ADD COLUMN     "financePlanId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_financePlanId_fkey" FOREIGN KEY ("financePlanId") REFERENCES "FinancesPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

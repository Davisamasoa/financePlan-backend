-- DropForeignKey
ALTER TABLE "Expenses" DROP CONSTRAINT "Expenses_financePlanid_fkey";

-- DropForeignKey
ALTER TABLE "FinancesPlan" DROP CONSTRAINT "FinancesPlan_userId_fkey";

-- AddForeignKey
ALTER TABLE "FinancesPlan" ADD CONSTRAINT "FinancesPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_financePlanid_fkey" FOREIGN KEY ("financePlanid") REFERENCES "FinancesPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

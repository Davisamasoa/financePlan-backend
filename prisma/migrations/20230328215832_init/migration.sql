-- CreateTable
CREATE TABLE "Goals" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "financePlanId" INTEGER NOT NULL,

    CONSTRAINT "Goals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Goals" ADD CONSTRAINT "Goals_financePlanId_fkey" FOREIGN KEY ("financePlanId") REFERENCES "FinancesPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

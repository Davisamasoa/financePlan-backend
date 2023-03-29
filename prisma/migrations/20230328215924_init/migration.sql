/*
  Warnings:

  - You are about to drop the column `value` on the `Goals` table. All the data in the column will be lost.
  - Added the required column `done` to the `Goals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Goals" DROP COLUMN "value",
ADD COLUMN     "done" BOOLEAN NOT NULL;

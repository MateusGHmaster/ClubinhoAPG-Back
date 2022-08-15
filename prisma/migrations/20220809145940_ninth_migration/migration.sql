/*
  Warnings:

  - Changed the type of `guardianPhone` on the `guardian` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "guardian" DROP COLUMN "guardianPhone",
ADD COLUMN     "guardianPhone" INTEGER NOT NULL;

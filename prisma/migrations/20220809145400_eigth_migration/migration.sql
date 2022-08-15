/*
  Warnings:

  - You are about to drop the column `name` on the `guardian` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `guardian` table. All the data in the column will be lost.
  - Added the required column `guardianName` to the `guardian` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guardianPhone` to the `guardian` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "guardian" DROP COLUMN "name",
DROP COLUMN "phone",
ADD COLUMN     "guardianName" TEXT NOT NULL,
ADD COLUMN     "guardianPhone" TEXT NOT NULL;

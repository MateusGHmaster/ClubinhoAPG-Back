/*
  Warnings:

  - You are about to drop the `kidsGuardian` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `guardianId` to the `kid` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "kidsGuardian" DROP CONSTRAINT "kidsGuardian_guardianId_fkey";

-- DropForeignKey
ALTER TABLE "kidsGuardian" DROP CONSTRAINT "kidsGuardian_kidId_fkey";

-- AlterTable
ALTER TABLE "kid" ADD COLUMN     "guardianId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "kidsGuardian";

-- CreateTable
CREATE TABLE "presence" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "kidId" INTEGER NOT NULL,

    CONSTRAINT "presence_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "kid" ADD CONSTRAINT "kid_guardianId_fkey" FOREIGN KEY ("guardianId") REFERENCES "guardian"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "presence" ADD CONSTRAINT "presence_kidId_fkey" FOREIGN KEY ("kidId") REFERENCES "kid"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

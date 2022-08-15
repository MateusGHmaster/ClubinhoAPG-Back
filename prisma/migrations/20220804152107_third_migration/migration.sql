/*
  Warnings:

  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teacher` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_userId_fkey";

-- DropForeignKey
ALTER TABLE "teacher" DROP CONSTRAINT "teacher_userId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "permission" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "sessions";

-- DropTable
DROP TABLE "teacher";

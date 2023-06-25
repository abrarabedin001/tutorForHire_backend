/*
  Warnings:

  - You are about to drop the column `categories` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "categories",
ADD COLUMN     "category" TEXT;

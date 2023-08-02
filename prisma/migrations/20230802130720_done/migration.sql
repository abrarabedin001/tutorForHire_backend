/*
  Warnings:

  - The `Phone` column on the `StudentProfile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `Phone` column on the `TeacherProfile` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "StudentProfile" DROP COLUMN "Phone",
ADD COLUMN     "Phone" INTEGER;

-- AlterTable
ALTER TABLE "TeacherProfile" DROP COLUMN "Phone",
ADD COLUMN     "Phone" INTEGER;

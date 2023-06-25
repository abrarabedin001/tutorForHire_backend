/*
  Warnings:

  - A unique constraint covering the columns `[title,teacherProfileId]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - Made the column `categories` on table `Course` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "categories" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Course_title_teacherProfileId_key" ON "Course"("title", "teacherProfileId");

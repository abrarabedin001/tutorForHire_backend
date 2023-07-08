/*
  Warnings:

  - A unique constraint covering the columns `[courseId,studentProfileId]` on the table `CourseEnroll` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CourseEnroll_courseId_studentProfileId_key" ON "CourseEnroll"("courseId", "studentProfileId");

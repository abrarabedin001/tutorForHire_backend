-- DropForeignKey
ALTER TABLE "CourseEnroll" DROP CONSTRAINT "CourseEnroll_courseId_fkey";

-- AddForeignKey
ALTER TABLE "CourseEnroll" ADD CONSTRAINT "CourseEnroll_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

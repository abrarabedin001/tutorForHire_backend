/*
  Warnings:

  - You are about to drop the `Rating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_studentProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_studentProfileId_fkey";

-- DropTable
DROP TABLE "Rating";

-- DropTable
DROP TABLE "Review";

-- CreateTable
CREATE TABLE "RatingReview" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "studentProfileId" TEXT,
    "rate" INTEGER NOT NULL DEFAULT 0,
    "comment" TEXT,
    "ratingReviewDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RatingReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RatingReview_courseId_studentProfileId_key" ON "RatingReview"("courseId", "studentProfileId");

-- AddForeignKey
ALTER TABLE "RatingReview" ADD CONSTRAINT "RatingReview_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingReview" ADD CONSTRAINT "RatingReview_studentProfileId_fkey" FOREIGN KEY ("studentProfileId") REFERENCES "StudentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

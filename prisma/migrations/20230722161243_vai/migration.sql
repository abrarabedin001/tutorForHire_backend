-- AlterTable
ALTER TABLE "CourseEnroll" ADD COLUMN     "paid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "transaction_id" TEXT;

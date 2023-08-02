/*
  Warnings:

  - You are about to drop the column `studentProfileId` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `teacherProfileId` on the `Chat` table. All the data in the column will be lost.
  - Added the required column `courseId` to the `Chat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_studentProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_teacherProfileId_fkey";

-- DropIndex
DROP INDEX "Chat_teacherProfileId_studentProfileId_key";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "studentProfileId",
DROP COLUMN "teacherProfileId",
ADD COLUMN     "chat" TEXT,
ADD COLUMN     "courseId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

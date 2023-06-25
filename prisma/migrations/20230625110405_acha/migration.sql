/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToCourse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToCourse" DROP CONSTRAINT "_CategoryToCourse_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToCourse" DROP CONSTRAINT "_CategoryToCourse_B_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "categories" TEXT;

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "_CategoryToCourse";

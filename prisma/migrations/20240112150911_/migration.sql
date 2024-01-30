/*
  Warnings:

  - You are about to drop the column `budet` on the `Balance` table. All the data in the column will be lost.
  - Added the required column `budget` to the `Balance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Balance" DROP COLUMN "budet",
ADD COLUMN     "budget" DOUBLE PRECISION NOT NULL;

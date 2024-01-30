/*
  Warnings:

  - Changed the type of `category` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TransactionCategory" AS ENUM ('Entertainment', 'Groceries', 'Bills', 'Transportation', 'Utilities', 'Food', 'Health', 'Clothing', 'Travel', 'Miscellaneous');

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "category",
ADD COLUMN     "category" "TransactionCategory" NOT NULL;

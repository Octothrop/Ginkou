/*
  Warnings:

  - Added the required column `remark` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "remark" VARCHAR(300) NOT NULL;

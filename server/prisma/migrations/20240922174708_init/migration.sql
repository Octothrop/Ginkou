/*
  Warnings:

  - Added the required column `cvv` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "cvv" VARCHAR(3) NOT NULL;

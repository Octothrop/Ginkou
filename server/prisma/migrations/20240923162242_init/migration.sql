-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('DEBIT', 'CREDIT');

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "type" "CardType" NOT NULL DEFAULT 'DEBIT';

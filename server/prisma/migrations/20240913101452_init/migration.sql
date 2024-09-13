-- CreateEnum
CREATE TYPE "MOP" AS ENUM ('CASH', 'CARD', 'NETBANKING', 'NEFT');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "mode" "MOP" NOT NULL DEFAULT 'CASH';

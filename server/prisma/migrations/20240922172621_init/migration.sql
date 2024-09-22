-- CreateEnum
CREATE TYPE "AccStatus" AS ENUM ('APPLIED', 'APPROVED', 'DECLINED');

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "accountStatus" "AccStatus" NOT NULL DEFAULT 'APPLIED';

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "cardId" INTEGER;

-- CreateTable
CREATE TABLE "Card" (
    "cardId" SERIAL NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "cardHolder" TEXT NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,
    "accountId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("cardId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Card_cardNumber_key" ON "Card"("cardNumber");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("cardId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("accountId") ON DELETE RESTRICT ON UPDATE CASCADE;

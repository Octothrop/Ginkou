-- CreateEnum
CREATE TYPE "ReqType" AS ENUM ('OPENAC', 'ClOSEAC', 'ISSUECARD', 'DELETECARD');

-- CreateTable
CREATE TABLE "Request" (
    "reqId" SERIAL NOT NULL,
    "reqFor" "ReqType" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("reqId")
);

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

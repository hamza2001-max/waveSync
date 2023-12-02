-- CreateTable
CREATE TABLE "LoginSession" (
    "sessionId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "LoginSession_pkey" PRIMARY KEY ("sessionId")
);

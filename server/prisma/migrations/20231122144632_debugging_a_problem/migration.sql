/*
  Warnings:

  - A unique constraint covering the columns `[sid]` on the table `LoginSession` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LoginSession_sid_key" ON "LoginSession"("sid");

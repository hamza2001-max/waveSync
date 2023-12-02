/*
  Warnings:

  - The primary key for the `LoginSession` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `LoginSession` on the `LoginSession` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LoginSession" DROP CONSTRAINT "LoginSession_pkey",
DROP COLUMN "LoginSession",
ADD COLUMN     "LoginSessionId" SERIAL NOT NULL,
ADD CONSTRAINT "LoginSession_pkey" PRIMARY KEY ("LoginSessionId");

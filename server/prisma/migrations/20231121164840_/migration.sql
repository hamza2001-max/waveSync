/*
  Warnings:

  - The primary key for the `LoginSession` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "LoginSession" DROP CONSTRAINT "LoginSession_pkey",
ADD COLUMN     "LoginSession" SERIAL NOT NULL,
ALTER COLUMN "sid" DROP DEFAULT,
ALTER COLUMN "sid" SET DATA TYPE TEXT,
ADD CONSTRAINT "LoginSession_pkey" PRIMARY KEY ("LoginSession");
DROP SEQUENCE "LoginSession_sid_seq";

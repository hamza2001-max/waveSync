/*
  Warnings:

  - The primary key for the `LoginSession` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `sessionId` on the `LoginSession` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `LoginSession` table. All the data in the column will be lost.
  - Added the required column `expire` to the `LoginSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sess` to the `LoginSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LoginSession" DROP CONSTRAINT "LoginSession_pkey",
DROP COLUMN "sessionId",
DROP COLUMN "userId",
ADD COLUMN     "expire" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "sess" JSONB NOT NULL,
ADD COLUMN     "sid" SERIAL NOT NULL,
ADD CONSTRAINT "LoginSession_pkey" PRIMARY KEY ("sid");

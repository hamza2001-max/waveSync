/*
  Warnings:

  - You are about to drop the column `roleId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Role_name_key";

-- AlterTable
ALTER TABLE "Role" ALTER COLUMN "name" SET DEFAULT 'client';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "roleId";

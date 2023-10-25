/*
  Warnings:

  - You are about to drop the column `roleRoleId` on the `User` table. All the data in the column will be lost.
  - Added the required column `roleId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "roleRoleId",
ADD COLUMN     "roleId" INTEGER NOT NULL;

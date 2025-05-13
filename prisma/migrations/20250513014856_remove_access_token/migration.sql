/*
  Warnings:

  - You are about to drop the column `accessToken` on the `adminToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[adminId]` on the table `adminToken` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "adminToken_accessToken_key";

-- AlterTable
ALTER TABLE "adminToken" DROP COLUMN "accessToken";

-- CreateIndex
CREATE UNIQUE INDEX "adminToken_adminId_key" ON "adminToken"("adminId");

/*
  Warnings:

  - You are about to drop the column `chatId` on the `Collaboration` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[collaborationId]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `collaborationId` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Collaboration" DROP CONSTRAINT "Collaboration_chatId_fkey";

-- DropIndex
DROP INDEX "Collaboration_chatId_key";

-- AlterTable
ALTER TABLE "Chat" ADD COLUMN     "collaborationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Collaboration" DROP COLUMN "chatId";

-- CreateIndex
CREATE UNIQUE INDEX "Chat_collaborationId_key" ON "Chat"("collaborationId");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_collaborationId_fkey" FOREIGN KEY ("collaborationId") REFERENCES "Collaboration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

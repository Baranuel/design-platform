-- DropForeignKey
ALTER TABLE "Collaboration" DROP CONSTRAINT "Collaboration_chatId_fkey";

-- AlterTable
ALTER TABLE "Collaboration" ALTER COLUMN "chatId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Collaboration" ADD CONSTRAINT "Collaboration_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE SET NULL ON UPDATE CASCADE;

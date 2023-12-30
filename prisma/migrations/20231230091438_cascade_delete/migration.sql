-- DropForeignKey
ALTER TABLE "Collaboration" DROP CONSTRAINT "Collaboration_chatId_fkey";

-- DropForeignKey
ALTER TABLE "Collaboration" DROP CONSTRAINT "Collaboration_designerListingId_fkey";

-- AddForeignKey
ALTER TABLE "Collaboration" ADD CONSTRAINT "Collaboration_designerListingId_fkey" FOREIGN KEY ("designerListingId") REFERENCES "DesignerListing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collaboration" ADD CONSTRAINT "Collaboration_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

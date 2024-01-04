-- DropForeignKey
ALTER TABLE "DesignerListing" DROP CONSTRAINT "DesignerListing_id_fkey";

-- AddForeignKey
ALTER TABLE "Collaboration" ADD CONSTRAINT "Collaboration_designerListingId_fkey" FOREIGN KEY ("designerListingId") REFERENCES "DesignerListing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

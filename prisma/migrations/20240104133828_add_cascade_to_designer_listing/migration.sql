-- DropForeignKey
ALTER TABLE "Collaboration" DROP CONSTRAINT "Collaboration_designerListingId_fkey";

-- AddForeignKey
ALTER TABLE "DesignerListing" ADD CONSTRAINT "DesignerListing_id_fkey" FOREIGN KEY ("id") REFERENCES "Collaboration"("designerListingId") ON DELETE CASCADE ON UPDATE CASCADE;

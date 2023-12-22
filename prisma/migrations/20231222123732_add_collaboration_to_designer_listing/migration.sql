/*
  Warnings:

  - A unique constraint covering the columns `[designerListingId]` on the table `Collaboration` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `designerListingId` to the `Collaboration` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Collaboration" DROP CONSTRAINT "Collaboration_designerId_fkey";

-- AlterTable
ALTER TABLE "Collaboration" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "designerListingId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Collaboration_designerListingId_key" ON "Collaboration"("designerListingId");

-- AddForeignKey
ALTER TABLE "Collaboration" ADD CONSTRAINT "Collaboration_designerListingId_fkey" FOREIGN KEY ("designerListingId") REFERENCES "DesignerListing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collaboration" ADD CONSTRAINT "Collaboration_designerId_fkey" FOREIGN KEY ("designerId") REFERENCES "Designer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

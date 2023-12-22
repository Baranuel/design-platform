-- CreateEnum
CREATE TYPE "DesignerListingStatus" AS ENUM ('APPROVED', 'PENDING', 'REJECTED');

-- AlterTable
ALTER TABLE "DesignerListing" ADD COLUMN     "status" "DesignerListingStatus" NOT NULL DEFAULT 'PENDING';

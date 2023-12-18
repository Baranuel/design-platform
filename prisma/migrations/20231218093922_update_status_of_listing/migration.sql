/*
  Warnings:

  - You are about to drop the column `status` on the `Proposal` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ProposalListingStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Proposal" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "ProposalListing" ADD COLUMN     "status" "ProposalListingStatus" NOT NULL DEFAULT 'ACTIVE';

-- DropEnum
DROP TYPE "ProposalStatus";

/*
  Warnings:

  - You are about to drop the column `views` on the `Proposal` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ProposalStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- AlterTable
ALTER TABLE "Proposal" DROP COLUMN "views",
ADD COLUMN     "status" "ProposalStatus" NOT NULL DEFAULT 'DRAFT';

-- CreateTable
CREATE TABLE "ProposalListing" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "views" INTEGER NOT NULL DEFAULT 0,
    "proposalId" INTEGER NOT NULL,

    CONSTRAINT "ProposalListing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DesignerListing" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "designerId" INTEGER NOT NULL,
    "proposalId" INTEGER NOT NULL,

    CONSTRAINT "DesignerListing_pkey" PRIMARY KEY ("designerId","proposalId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProposalListing_proposalId_key" ON "ProposalListing"("proposalId");

-- AddForeignKey
ALTER TABLE "ProposalListing" ADD CONSTRAINT "ProposalListing_proposalId_fkey" FOREIGN KEY ("proposalId") REFERENCES "Proposal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesignerListing" ADD CONSTRAINT "DesignerListing_designerId_fkey" FOREIGN KEY ("designerId") REFERENCES "Designer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesignerListing" ADD CONSTRAINT "DesignerListing_proposalId_fkey" FOREIGN KEY ("proposalId") REFERENCES "ProposalListing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

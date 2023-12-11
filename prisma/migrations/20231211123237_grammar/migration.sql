/*
  Warnings:

  - You are about to drop the column `breif` on the `Proposal` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clientId]` on the table `Proposal` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `brief` to the `Proposal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `Proposal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Proposal" DROP COLUMN "breif",
ADD COLUMN     "brief" TEXT NOT NULL,
ADD COLUMN     "clientId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Proposal_clientId_key" ON "Proposal"("clientId");

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

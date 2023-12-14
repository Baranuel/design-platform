/*
  Warnings:

  - You are about to drop the column `competitorDescription` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `currentState` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `features` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `redesignFix` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `usefulFeatures` on the `Proposal` table. All the data in the column will be lost.
  - You are about to drop the column `userDescription` on the `Proposal` table. All the data in the column will be lost.
  - Added the required column `competitorAnalysis` to the `Proposal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetGroup` to the `Proposal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `websiteFeatures` to the `Proposal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `websiteLacking` to the `Proposal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `websiteNiceToHave` to the `Proposal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `websiteUse` to the `Proposal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Proposal" DROP COLUMN "competitorDescription",
DROP COLUMN "currentState",
DROP COLUMN "features",
DROP COLUMN "redesignFix",
DROP COLUMN "title",
DROP COLUMN "usefulFeatures",
DROP COLUMN "userDescription",
ADD COLUMN     "competitorAnalysis" TEXT NOT NULL,
ADD COLUMN     "targetGroup" TEXT NOT NULL,
ADD COLUMN     "websiteFeatures" TEXT NOT NULL,
ADD COLUMN     "websiteLacking" TEXT NOT NULL,
ADD COLUMN     "websiteNiceToHave" TEXT NOT NULL,
ADD COLUMN     "websiteUse" TEXT NOT NULL;

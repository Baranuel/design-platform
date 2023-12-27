/*
  Warnings:

  - The `status` column on the `Collaboration` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "CollaborationStatus" AS ENUM ('Research', 'Analysis', 'Ideation', 'Prototype', 'Testing');

-- AlterTable
ALTER TABLE "Collaboration" DROP COLUMN "status",
ADD COLUMN     "status" "CollaborationStatus" NOT NULL DEFAULT 'Research';

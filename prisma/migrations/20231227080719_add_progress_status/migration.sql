/*
  Warnings:

  - The values [Research,Analysis,Ideation,Prototype,Testing] on the enum `CollaborationStatus` will be removed. If these variants are still used in the database, this will fail.
  - The `progress` column on the `Collaboration` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "CollaborationProgress" AS ENUM ('Research', 'Analysis', 'Ideation', 'Prototype', 'Testing');

-- AlterEnum
BEGIN;
CREATE TYPE "CollaborationStatus_new" AS ENUM ('REJECTED', 'ONGOING');
ALTER TABLE "Collaboration" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Collaboration" ALTER COLUMN "status" TYPE "CollaborationStatus_new" USING ("status"::text::"CollaborationStatus_new");
ALTER TYPE "CollaborationStatus" RENAME TO "CollaborationStatus_old";
ALTER TYPE "CollaborationStatus_new" RENAME TO "CollaborationStatus";
DROP TYPE "CollaborationStatus_old";
ALTER TABLE "Collaboration" ALTER COLUMN "status" SET DEFAULT 'ONGOING';
COMMIT;

-- AlterTable
ALTER TABLE "Collaboration" DROP COLUMN "progress",
ADD COLUMN     "progress" "CollaborationProgress" NOT NULL DEFAULT 'Research',
ALTER COLUMN "status" SET DEFAULT 'ONGOING';

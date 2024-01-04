/*
  Warnings:

  - The primary key for the `Collaboration` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Collaboration" DROP CONSTRAINT "Collaboration_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Collaboration_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Collaboration_id_seq";

/*
  Warnings:

  - The primary key for the `DesignerListing` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "DesignerListing" DROP CONSTRAINT "DesignerListing_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "DesignerListing_pkey" PRIMARY KEY ("id");

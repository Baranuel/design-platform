-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_id_fkey";

-- DropForeignKey
ALTER TABLE "Designer" DROP CONSTRAINT "Designer_id_fkey";

-- AddForeignKey
ALTER TABLE "Designer" ADD CONSTRAINT "Designer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

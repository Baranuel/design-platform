-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CLIENT', 'DESIGNER');

-- CreateEnum
CREATE TYPE "ProposalStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "clerkId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "Role" NOT NULL,
    "country" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Designer" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Designer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DesignerInformation" (
    "id" SERIAL NOT NULL,
    "designerId" INTEGER NOT NULL,
    "university" TEXT NOT NULL,
    "yearsOfExperience" INTEGER NOT NULL,
    "portfolio" TEXT NOT NULL,

    CONSTRAINT "DesignerInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientInformation" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyWebsite" TEXT NOT NULL,
    "companyDescription" TEXT NOT NULL,
    "companyIndustry" TEXT[],
    "companySize" TEXT NOT NULL,
    "companyRegistration" TEXT NOT NULL,

    CONSTRAINT "ClientInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proposal" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "ProposalStatus" NOT NULL DEFAULT 'DRAFT',
    "brief" TEXT NOT NULL,
    "websiteUse" TEXT NOT NULL,
    "websiteLacking" TEXT NOT NULL,
    "websiteFeatures" TEXT NOT NULL,
    "websiteNiceToHave" TEXT NOT NULL,
    "targetGroup" TEXT NOT NULL,
    "competitorAnalysis" TEXT NOT NULL,
    "files" TEXT[],

    CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProposalListing" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "views" INTEGER NOT NULL DEFAULT 0,
    "clientId" INTEGER NOT NULL,
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

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "toolTip" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collaboration" (
    "id" SERIAL NOT NULL,
    "designerId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,
    "chatId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "progress" TEXT NOT NULL,
    "linkToDesign" TEXT NOT NULL,

    CONSTRAINT "Collaboration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chatId" INTEGER NOT NULL,
    "senderId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "Designer_userId_key" ON "Designer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DesignerInformation_designerId_key" ON "DesignerInformation"("designerId");

-- CreateIndex
CREATE UNIQUE INDEX "Client_userId_key" ON "Client"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ClientInformation_clientId_key" ON "ClientInformation"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "Proposal_clientId_key" ON "Proposal"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "ProposalListing_clientId_key" ON "ProposalListing"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "ProposalListing_proposalId_key" ON "ProposalListing"("proposalId");

-- CreateIndex
CREATE UNIQUE INDEX "Collaboration_designerId_key" ON "Collaboration"("designerId");

-- CreateIndex
CREATE UNIQUE INDEX "Collaboration_clientId_key" ON "Collaboration"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "Collaboration_chatId_key" ON "Collaboration"("chatId");

-- AddForeignKey
ALTER TABLE "Designer" ADD CONSTRAINT "Designer_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesignerInformation" ADD CONSTRAINT "DesignerInformation_designerId_fkey" FOREIGN KEY ("designerId") REFERENCES "Designer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientInformation" ADD CONSTRAINT "ClientInformation_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProposalListing" ADD CONSTRAINT "ProposalListing_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProposalListing" ADD CONSTRAINT "ProposalListing_proposalId_fkey" FOREIGN KEY ("proposalId") REFERENCES "Proposal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesignerListing" ADD CONSTRAINT "DesignerListing_designerId_fkey" FOREIGN KEY ("designerId") REFERENCES "Designer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesignerListing" ADD CONSTRAINT "DesignerListing_proposalId_fkey" FOREIGN KEY ("proposalId") REFERENCES "ProposalListing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collaboration" ADD CONSTRAINT "Collaboration_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collaboration" ADD CONSTRAINT "Collaboration_designerId_fkey" FOREIGN KEY ("designerId") REFERENCES "Designer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collaboration" ADD CONSTRAINT "Collaboration_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

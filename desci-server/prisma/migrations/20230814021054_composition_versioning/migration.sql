-- AlterTable
ALTER TABLE "CompositionDataReference" ADD COLUMN     "compositionVersionId" INTEGER;

-- AlterTable
ALTER TABLE "PublicDataReference" ADD COLUMN     "compositionVersionId" INTEGER;

-- CreateTable
CREATE TABLE "CompositionVersion" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "manifestUrl" TEXT NOT NULL,
    "cid" TEXT NOT NULL DEFAULT '',
    "transactionId" TEXT,
    "compositionId" INTEGER,

    CONSTRAINT "CompositionVersion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CompositionVersion" ADD CONSTRAINT "CompositionVersion_compositionId_fkey" FOREIGN KEY ("compositionId") REFERENCES "Composition"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompositionDataReference" ADD CONSTRAINT "CompositionDataReference_compositionVersionId_fkey" FOREIGN KEY ("compositionVersionId") REFERENCES "CompositionVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicDataReference" ADD CONSTRAINT "PublicDataReference_compositionVersionId_fkey" FOREIGN KEY ("compositionVersionId") REFERENCES "CompositionVersion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

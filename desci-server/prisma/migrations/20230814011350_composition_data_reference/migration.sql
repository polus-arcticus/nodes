-- CreateTable
CREATE TABLE "CompositionDataReference" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "cid" TEXT NOT NULL,
    "root" BOOLEAN NOT NULL,
    "rootCid" TEXT,
    "path" TEXT,
    "directory" BOOLEAN NOT NULL,
    "size" INTEGER NOT NULL,
    "type" "CompositionDataType" NOT NULL,
    "external" BOOLEAN,
    "compositionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "versionId" INTEGER,

    CONSTRAINT "CompositionDataReference_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CompositionDataReference" ADD CONSTRAINT "CompositionDataReference_compositionId_fkey" FOREIGN KEY ("compositionId") REFERENCES "Composition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompositionDataReference" ADD CONSTRAINT "CompositionDataReference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

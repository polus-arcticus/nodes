-- CreateTable
CREATE TABLE "Composition" (
    "id" SERIAL NOT NULL,
    "state" "NodeState" NOT NULL DEFAULT 'NEW',
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "uuid" TEXT,
    "ownerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "cid" TEXT NOT NULL DEFAULT '',
    "manifestUrl" TEXT NOT NULL,

    CONSTRAINT "Composition_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Composition_uuid_key" ON "Composition"("uuid");

-- CreateIndex
CREATE INDEX "Composition_ownerId_idx" ON "Composition"("ownerId");

-- CreateIndex
CREATE INDEX "Composition_uuid_idx" ON "Composition"("uuid");

-- AddForeignKey
ALTER TABLE "Composition" ADD CONSTRAINT "Composition_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usedAt" TIMESTAMP(3),
    "scheduledFor" TIMESTAMP(3),
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "likes" INTEGER DEFAULT 0,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuoteTags" (
    "id" TEXT NOT NULL,
    "quoteId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "QuoteTags_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuoteTags" ADD CONSTRAINT "QuoteTags_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "Quote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteTags" ADD CONSTRAINT "QuoteTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

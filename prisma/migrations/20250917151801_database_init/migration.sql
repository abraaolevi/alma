-- CreateTable
CREATE TABLE "Lead" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "websiteUrl" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "resumeUrl" TEXT,
    "moreInfo" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "LeadVisa" (
    "leadId" INTEGER NOT NULL,
    "visaId" INTEGER NOT NULL,

    PRIMARY KEY ("leadId", "visaId"),
    CONSTRAINT "LeadVisa_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LeadVisa_visaId_fkey" FOREIGN KEY ("visaId") REFERENCES "Visa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Visa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Lead_email_key" ON "Lead"("email");

-- CreateIndex
CREATE INDEX "idx_visaId" ON "LeadVisa"("visaId");

-- CreateIndex
CREATE UNIQUE INDEX "Visa_name_key" ON "Visa"("name");

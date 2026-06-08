-- CreateTable
CREATE TABLE "jobs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "workModel" TEXT NOT NULL,
    "salary" REAL,
    "description" TEXT NOT NULL,
    "appliedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusId" INTEGER NOT NULL,
    CONSTRAINT "jobs_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "job_statuses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "job_comments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jobId" INTEGER NOT NULL,
    CONSTRAINT "job_comments_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "job_contacts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "linkedin" TEXT,
    "phone" TEXT,
    "jobId" INTEGER NOT NULL,
    CONSTRAINT "job_contacts_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "job_links" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "jobId" INTEGER NOT NULL,
    CONSTRAINT "job_links_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_MandatorySkills" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_MandatorySkills_A_fkey" FOREIGN KEY ("A") REFERENCES "jobs" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_MandatorySkills_B_fkey" FOREIGN KEY ("B") REFERENCES "skills" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_RecommendedSkills" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_RecommendedSkills_A_fkey" FOREIGN KEY ("A") REFERENCES "jobs" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_RecommendedSkills_B_fkey" FOREIGN KEY ("B") REFERENCES "skills" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_MandatorySkills_AB_unique" ON "_MandatorySkills"("A", "B");

-- CreateIndex
CREATE INDEX "_MandatorySkills_B_index" ON "_MandatorySkills"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RecommendedSkills_AB_unique" ON "_RecommendedSkills"("A", "B");

-- CreateIndex
CREATE INDEX "_RecommendedSkills_B_index" ON "_RecommendedSkills"("B");

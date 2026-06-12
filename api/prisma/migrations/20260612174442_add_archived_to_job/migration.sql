-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_job_contacts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "role" TEXT,
    "linkedin" TEXT,
    "phone" TEXT,
    "jobId" INTEGER NOT NULL,
    CONSTRAINT "job_contacts_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_job_contacts" ("id", "jobId", "linkedin", "name", "phone", "role") SELECT "id", "jobId", "linkedin", "name", "phone", "role" FROM "job_contacts";
DROP TABLE "job_contacts";
ALTER TABLE "new_job_contacts" RENAME TO "job_contacts";
CREATE TABLE "new_jobs" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "workModel" TEXT NOT NULL,
    "salary" REAL,
    "description" TEXT NOT NULL,
    "appliedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "statusId" INTEGER NOT NULL,
    CONSTRAINT "jobs_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "job_statuses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_jobs" ("appliedAt", "company", "createdAt", "description", "id", "salary", "statusId", "title", "workModel") SELECT "appliedAt", "company", "createdAt", "description", "id", "salary", "statusId", "title", "workModel" FROM "jobs";
DROP TABLE "jobs";
ALTER TABLE "new_jobs" RENAME TO "jobs";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

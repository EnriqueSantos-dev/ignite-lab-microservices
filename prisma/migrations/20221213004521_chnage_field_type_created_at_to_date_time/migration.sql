/*
  Warnings:

  - You are about to alter the column `createdAt` on the `notifications` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_notifications" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "readAt" DATETIME,
    "recipientId" TEXT NOT NULL
);
INSERT INTO "new_notifications" ("category", "content", "createdAt", "id", "readAt", "recipientId") SELECT "category", "content", "createdAt", "id", "readAt", "recipientId" FROM "notifications";
DROP TABLE "notifications";
ALTER TABLE "new_notifications" RENAME TO "notifications";
CREATE INDEX "notifications_recipientId_idx" ON "notifications"("recipientId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

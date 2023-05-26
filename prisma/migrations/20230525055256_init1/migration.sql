/*
  Warnings:

  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `locationId` on the `Picture` table. All the data in the column will be lost.
  - Added the required column `location` to the `Picture` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Location";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Picture" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullSizePath" TEXT NOT NULL,
    "thumbnailPath" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Picture" ("createdAt", "fullSizePath", "id", "thumbnailPath", "title") SELECT "createdAt", "fullSizePath", "id", "thumbnailPath", "title" FROM "Picture";
DROP TABLE "Picture";
ALTER TABLE "new_Picture" RENAME TO "Picture";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

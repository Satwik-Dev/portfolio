-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "aboutBadge" TEXT NOT NULL DEFAULT 'Founding Engineer @ Spirit AI',
ADD COLUMN     "aboutTitle" TEXT NOT NULL DEFAULT 'Building the future, one system at a time.',
ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "metric1Label" TEXT NOT NULL DEFAULT 'Concurrent Users Served',
ADD COLUMN     "metric1Value" TEXT NOT NULL DEFAULT '100K+',
ADD COLUMN     "metric2Label" TEXT NOT NULL DEFAULT 'API Response Time',
ADD COLUMN     "metric2Value" TEXT NOT NULL DEFAULT '<200ms',
ADD COLUMN     "metric3Label" TEXT NOT NULL DEFAULT 'GPA @ UMBC',
ADD COLUMN     "metric3Value" TEXT NOT NULL DEFAULT '3.91',
ADD COLUMN     "metric4Label" TEXT NOT NULL DEFAULT 'APIs Designed',
ADD COLUMN     "metric4Value" TEXT NOT NULL DEFAULT '20+';

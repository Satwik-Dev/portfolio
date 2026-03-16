-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "stats" JSONB,
ALTER COLUMN "category" SET DEFAULT 'Web Application';

-- AlterTable
ALTER TABLE "skills" ADD COLUMN     "logoUrl" TEXT;
